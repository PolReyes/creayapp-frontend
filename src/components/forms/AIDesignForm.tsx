import { useState } from 'react';
import { generateBannerApi } from '../../api/ai.api';
import type { Design } from '../../api/ai.api';
import { Sparkles, Loader2, ImagePlus, X } from 'lucide-react';

interface BannerFormProps {
    onSuccess: (newDesign: Design) => void;
}

export const AIDesignForm = ({ onSuccess }: BannerFormProps) => {
    const [topic, setTopic] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [primaryColor, setPrimaryColor] = useState('#4f46e5');
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [format, setFormat] = useState<'square' | 'vertical' | 'horizontal'>('square');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);
        const updatedFiles = [...files, ...selectedFiles].slice(0, 4); // Límite de 4 archivos
        setFiles(updatedFiles);

        // Generar URLs de vista previa
        const newPreviews = updatedFiles.map((file) => URL.createObjectURL(file));

        // Revocar URLs anteriores para evitar fugas de memoria
        filePreviews.forEach((url) => URL.revokeObjectURL(url));
        setFilePreviews(newPreviews);
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        URL.revokeObjectURL(filePreviews[index]);
        const updatedPreviews = filePreviews.filter((_, i) => i !== index);

        setFiles(updatedFiles);
        setFilePreviews(updatedPreviews);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('topic', topic);
            formData.append('format', format);
            if (title) formData.append('title', title);
            if (subtitle) formData.append('subtitle', subtitle);
            if (companyName) formData.append('companyName', companyName);
            if (phone) formData.append('phone', phone);
            if (primaryColor) formData.append('primaryColor', primaryColor);
            files.forEach((file) => {
                formData.append('assets', file);
            });

            const result = await generateBannerApi(formData);
            onSuccess(result);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.errors?.[0] ||
                'Error al solicitar la generación de la imagen.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl w-fit">
                    <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        Generar Nuevo Flyer / Banner
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        Ingresa los parámetros clave para que la IA cree tu diseño.
                    </p>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-xs sm:text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Topic / Niche */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Tema / Rubro / Nicho <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Ej. Promoción de Hamburguesas Gourmet 2x1"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                    />
                </div>

                {/* Title & Subtitle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Título Destacado
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. SUPER OFERTA"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Subtítulo
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. Solo por este fin de semana"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Nombre de Empresa
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. Burger House"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            Teléfono de Contacto
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. +51 987 654 321"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700/80 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Formato de Redes Sociales
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'square', label: 'Cuadrado (1:1)', desc: 'Posts Feed' },
                            { id: 'vertical', label: 'Vertical (9:16)', desc: 'Stories/Estados' },
                            { id: 'horizontal', label: 'Horizontal (16:9)', desc: 'Portadas/Banners' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setFormat(item.id as any)}
                                className={`p-2.5 rounded-xl border text-center transition-all ${format === item.id
                                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium'
                                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                                    }`}
                            >
                                <div className="text-xs font-semibold">{item.label}</div>
                                <div className="text-[10px] text-zinc-400">{item.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Primary Color Picker */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Color Predominante
                    </label>
                    <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700 h-10 w-16 sm:w-20 shrink-0">
                            <input
                                type="color"
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="h-12 w-24 -m-1 cursor-pointer bg-transparent border-0"
                            />
                        </div>
                        <span className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700">
                            {primaryColor}
                        </span>
                    </div>
                </div>

                {/* File Upload Area */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Recursos Adicionales (Logos/Imágenes - Máx 4)
                    </label>

                    <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-700/80 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl p-4 sm:p-5 bg-zinc-50/50 dark:bg-zinc-800/30 transition-colors text-center cursor-pointer">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            disabled={files.length >= 4}
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />

                        <div className="flex flex-col items-center justify-center gap-2">
                            <div className="p-2.5 bg-zinc-200/60 dark:bg-zinc-700/50 rounded-xl text-zinc-600 dark:text-zinc-300">
                                <ImagePlus className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    {files.length >= 4 ? 'Límite de imágenes alcanzado' : 'Haz clic o arrastra tus imágenes aquí'}
                                </p>
                                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                                    PNG, JPG o WEBP (máx. 4 archivos)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Previews Grid */}
                    {filePreviews.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                            {filePreviews.map((src, index) => (
                                <div key={index} className="relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 aspect-square bg-zinc-100 dark:bg-zinc-800">
                                    <img
                                        src={src}
                                        alt={`Recurso ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(index)}
                                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:bg-indigo-400 dark:disabled:bg-indigo-900/50 text-white text-sm sm:text-base font-medium rounded-xl shadow-sm hover:shadow transition-all flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Generando diseño con IA...</span>
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            <span>Generar Flyer</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};