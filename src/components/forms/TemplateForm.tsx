import React, { useState } from 'react';
import { Upload, Plus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { createTemplateApi } from '../../api/template.api';

export const AddTemplateForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Redes Sociales');
    const [width, setWidth] = useState(1080);
    const [height, setHeight] = useState(1080);
    const [file, setFile] = useState<File | null>(null);
    const [previewLocal, setPreviewLocal] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewLocal(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setStatus({ type: 'error', msg: 'Por favor selecciona una imagen para la vista previa.' });
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('width', width.toString());
            formData.append('height', height.toString());
            formData.append('file', file);
            formData.append(
                'elements',
                JSON.stringify({
                    background: '',
                    layers: [],
                })
            );

            // Usamos la API configurada con Axios
            await createTemplateApi(formData);

            setStatus({ type: 'success', msg: '¡Plantilla creada exitosamente!' });
            setTitle('');
            setDescription('');
            setFile(null);
            setPreviewLocal(null);
        } catch (err: any) {
            // Captura el mensaje de error provisto por Axios o la respuesta del servidor
            const errorMessage = err.response?.data?.message || err.message || 'Ocurrió un error inesperado';
            setStatus({ type: 'error', msg: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Agregar Nueva Plantilla
            </h2>

            {status && (
                <div
                    className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm ${status.type === 'success'
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400'
                        }`}
                >
                    {status.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                        <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
                    )}
                    <span>{status.msg}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Título
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej. Banner Black Friday"
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Categoría
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        >
                            <option value="Redes Sociales">Redes Sociales</option>
                            <option value="Promociones">Promociones</option>
                            <option value="Eventos">Eventos</option>
                            <option value="Corporativo">Corporativo</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Descripción
                    </label>
                    <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descripción opcional de la plantilla..."
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Ancho (px)
                        </label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Alto (px)
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        />
                    </div>
                </div>

                {/* Subida de Archivo con Previsualización */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Vista Previa (Imagen)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 flex flex-col items-center justify-center transition-colors bg-slate-50/50 dark:bg-slate-950/50">
                        {previewLocal ? (
                            <div className="space-y-4 text-center">
                                <img
                                    src={previewLocal}
                                    alt="Preview"
                                    className="max-h-48 rounded-lg object-contain mx-auto shadow-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFile(null);
                                        setPreviewLocal(null);
                                    }}
                                    className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-medium"
                                >
                                    Cambiar imagen
                                </button>
                            </div>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center w-full py-4">
                                <Upload className="w-10 h-10 text-slate-400 dark:text-slate-500 mb-2" />
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Haz clic para subir una imagen
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    PNG, JPG o WEBP (máx. 5MB)
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-900/50 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Subiendo plantilla...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5" />
                            <span>Guardar Plantilla</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddTemplateForm;