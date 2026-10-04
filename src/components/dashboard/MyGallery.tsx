import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, RefreshCw, AlertCircle, Calendar, Phone, Building2, Download, Eye, X } from 'lucide-react';
import { getMyDesignsApi, type Design } from '../../api/ai.api';

export const MyGallery: React.FC = () => {
    const [designs, setDesigns] = useState<Design[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

    const fetchDesigns = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getMyDesignsApi();
            setDesigns(data);
        } catch (err: any) {
            setError(
                err.response?.data?.message || 'Error al cargar tus imágenes generadas.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDesigns();
    }, []);

    const handleDownload = (imageUrl: string, fileName = 'diseno-ia.png') => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mi Galería IA</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Tus banners y flyers generados previamente por Inteligencia Artificial.
                    </p>
                </div>
                <button
                    onClick={fetchDesigns}
                    disabled={loading}
                    className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-2 text-sm shadow-sm"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>Actualizar</span>
                </button>
            </div>

            {/* Estado de Error */}
            {error && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 flex items-center gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
                    <span>{error}</span>
                </div>
            )}

            {/* Cargando (Skeletons) */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="h-80 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl animate-pulse flex flex-col justify-between p-4"
                        >
                            <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                            <div className="space-y-2 mt-4">
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : designs.length === 0 ? (
                /* Vacio */
                <div className="p-12 text-center bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
                    <ImageIcon className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Aún no tienes diseños generados</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Ve a la sección "Crear flyer" para generar tu primer diseño con IA.
                    </p>
                </div>
            ) : (
                /* Grilla */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {designs.map((design) => (
                        <div
                            key={design.id}
                            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="aspect-square bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex items-center justify-center p-2 group">
                                <img
                                    src={design.generatedUrl}
                                    alt={design.title || design.topic}
                                    className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />

                                {design.primaryColor && (
                                    <span
                                        className="absolute top-3 left-3 w-4 h-4 rounded-full border border-black/10 dark:border-white/20 shadow-md"
                                        style={{ backgroundColor: design.primaryColor }}
                                        title={`Color principal: ${design.primaryColor}`}
                                    />
                                )}

                                {/* Acciones en Hover */}
                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                                    <button
                                        onClick={() => setSelectedDesign(design)}
                                        className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-transform hover:scale-110 flex items-center gap-2 text-xs font-medium"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>Ver detalle</span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDownload(
                                                design.generatedUrl,
                                                `${design.topic || 'diseno'}-${design.id}.png`
                                            )
                                        }
                                        className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-600 transition-transform hover:scale-110"
                                        title="Descargar imagen"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-md">
                                        {design.topic}
                                    </span>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-base truncate mt-2">
                                        {design.title || design.companyName || 'Sin título'}
                                    </h3>
                                    {design.subtitle && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{design.subtitle}</p>
                                    )}
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                                    {design.companyName && (
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                                            <span className="truncate">{design.companyName}</span>
                                        </div>
                                    )}
                                    {design.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                                            <span>{design.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 pt-1">
                                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                                        <span>{new Date(design.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL */}
            {selectedDesign && (
                <div className="fixed inset-0 z-50 bg-black/70 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg truncate">
                                {selectedDesign.title || selectedDesign.topic}
                            </h3>
                            <button
                                onClick={() => setSelectedDesign(null)}
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center bg-slate-100 dark:bg-slate-950">
                            <img
                                src={selectedDesign.generatedUrl}
                                alt={selectedDesign.title || selectedDesign.topic}
                                className="max-h-[60vh] object-contain rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl"
                            />

                            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold">Tema</p>
                                    <p className="font-medium text-slate-900 dark:text-white">{selectedDesign.topic}</p>
                                </div>
                                {selectedDesign.companyName && (
                                    <div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold">Empresa</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{selectedDesign.companyName}</p>
                                    </div>
                                )}
                                {selectedDesign.subtitle && (
                                    <div className="sm:col-span-2">
                                        <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold">Subtítulo</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{selectedDesign.subtitle}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Modal */}
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-white dark:bg-slate-900">
                            <button
                                onClick={() => setSelectedDesign(null)}
                                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-colors"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={() =>
                                    handleDownload(
                                        selectedDesign.generatedUrl,
                                        `${selectedDesign.topic || 'diseno'}-${selectedDesign.id}.png`
                                    )
                                }
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                            >
                                <Download className="w-4 h-4" />
                                <span>Descargar Imagen</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyGallery;