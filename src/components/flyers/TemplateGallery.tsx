import React, { useEffect, useState } from 'react';
import { ArrowLeft, LayoutTemplate, Search, Loader2 } from 'lucide-react';
import type { AdminTemplate } from '../../types/flyer.type';
import { getTemplatesApi } from '../../api/template.api'; // Reemplaza por la ruta correcta de tu archivo de API

interface Props {
    onSelectTemplate: (template: AdminTemplate) => void;
    onBack: () => void;
}

export const TemplateGallery: React.FC<Props> = ({ onSelectTemplate, onBack }) => {
    const [templates, setTemplates] = useState<AdminTemplate[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar plantillas desde la API backend al montar el componente
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getTemplatesApi();

                // Mapear el resultado para asegurar la compatibilidad con AdminTemplate
                const mappedTemplates: AdminTemplate[] = data.map((t) => ({
                    id: t.id,
                    title: t.title,
                    category: t.category,
                    imageUrl: t.previewUrl, // Mapeo de previewUrl a imageUrl
                    description: t.description,
                    width: t.width,
                    height: t.height,
                    elements: t.elements,
                }));

                setTemplates(mappedTemplates);
            } catch (err: any) {
                console.error('Error al cargar las plantillas:', err);
                setError('No se pudieron cargar las plantillas. Por favor, reintenta más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const filteredTemplates = templates.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Selecciona una Plantilla
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Plantillas preparadas y optimizadas por el administrador.
                        </p>
                    </div>
                </div>

                {/* Buscador */}
                <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar plantilla..."
                        className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                </div>
            </div>

            {/* Estado de Carga */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
                    <p className="text-sm font-medium">Cargando plantillas disponibles...</p>
                </div>
            )}

            {/* Estado de Error */}
            {!loading && error && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl text-rose-600 dark:text-rose-400 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Lista vacía */}
            {!loading && !error && filteredTemplates.length === 0 && (
                <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                    <LayoutTemplate className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        No se encontraron plantillas
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Intenta buscando con otra palabra clave o agrega plantillas desde el panel de administración.
                    </p>
                </div>
            )}

            {/* Grilla de Plantillas */}
            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => onSelectTemplate(template)}
                            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                        >
                            <div className="aspect-square bg-slate-950 relative overflow-hidden">
                                <img
                                    src={template.imageUrl}
                                    alt={template.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-lg">
                                        Usar esta plantilla
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                                        {template.title}
                                    </h4>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {template.category}
                                    </span>
                                </div>
                                <LayoutTemplate className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};