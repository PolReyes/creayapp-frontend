import React, { useEffect, useState } from 'react';
import { LayoutGrid, RefreshCw, AlertCircle } from 'lucide-react';
import api from '../../api/axios';

interface Template {
    id: string;
    title: string;
    description?: string;
    category: string;
    width: number;
    height: number;
    previewUrl: string;
    createdAt?: string;
}

export const AdminTemplatesList: React.FC = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTemplates = async () => {
        setLoading(true);
        setError('');

        try {
            // Axios inyecta baseURL e intercepta el Token automáticamente
            const response = await api.get('/templates');
            setTemplates(response.data);
        } catch (err: any) {
            setError(
                err.response?.data?.message || 'Error al obtener las plantillas registradas.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div className="space-y-6">
            {/* Encabezado y Acción */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Mis Plantillas
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Plantillas subidas y disponibles en el catálogo.
                    </p>
                </div>
                <button
                    onClick={fetchTemplates}
                    disabled={loading}
                    className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-2 text-sm shadow-sm"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>Actualizar</span>
                </button>
            </div>

            {/* Alerta de Error */}
            {error && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
                    <span>{error}</span>
                </div>
            )}

            {/* Estado de Carga (Skeletons) */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="h-64 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl animate-pulse"
                        />
                    ))}
                </div>
            ) : templates.length === 0 ? (
                /* Estado Vacío */
                <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
                    <LayoutGrid className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        No hay plantillas registradas
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Sube tu primera plantilla usando la opción "Agregar plantilla".
                    </p>
                </div>
            ) : (
                /* Cuadrícula de Plantillas */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((tpl) => (
                        <div
                            key={tpl.id}
                            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Imagen y Categoría */}
                            <div className="aspect-square bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex items-center justify-center p-2">
                                <img
                                    src={tpl.previewUrl}
                                    alt={tpl.title}
                                    className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 text-indigo-600 dark:text-indigo-400 text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                                    {tpl.category}
                                </span>
                            </div>

                            {/* Información */}
                            <div className="p-5">
                                <h3 className="font-bold text-slate-900 dark:text-white text-base truncate">
                                    {tpl.title}
                                </h3>
                                {tpl.description && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                        {tpl.description}
                                    </p>
                                )}
                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span>Dimensiones:</span>
                                    <span className="text-slate-700 dark:text-slate-300 font-mono">
                                        {tpl.width} x {tpl.height} px
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTemplatesList;