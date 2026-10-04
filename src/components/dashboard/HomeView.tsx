import React from 'react';
import { Image, Wand2, PlusSquare, Info, BarChart3, ArrowRight } from 'lucide-react';

interface HomeViewProps {
    userRole: 'ADMIN' | 'USER';
    onNavigate: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ userRole, onNavigate }) => {
    return (
        <div className="space-y-8">
            {/* 1. Banner Informativo para el Usuario */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-slate-100 dark:from-indigo-900/60 dark:via-purple-900/40 dark:to-slate-900 border border-indigo-500/20 dark:border-indigo-500/30 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-600/10 dark:bg-indigo-600/30 rounded-xl border border-indigo-500/20 dark:border-indigo-500/40 hidden sm:block">
                        <Info className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                            ¡Bienvenido a CreaYApp! ✨
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                            Crea contenido visual con Inteligencia Artificial en segundos. Diseña flyers para tus redes sociales,
                            explora tus imágenes generadas o administra las plantillas oficiales.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Marcador de Posición para Métricas (Solo Admin) */}
            {userRole === 'ADMIN' && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-700/80">
                    <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 mb-2">
                        <BarChart3 className="w-5 h-5" />
                        <h2 className="font-semibold text-lg text-slate-900 dark:text-white">
                            Métricas del Sistema (Reservado)
                        </h2>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Próximamente: Estadísticas en tiempo real de usuarios activos, diseños generados y plantillas más usadas.
                    </p>
                </div>
            )}

            {/* 3. Cards de Redirección Rápida */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    ¿Qué deseas hacer hoy?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card: Mi Galería */}
                    <div
                        onClick={() => onNavigate('gallery')}
                        className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 hover:border-indigo-500/50 hover:shadow-lg dark:hover:bg-slate-800/50 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                                <Image className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Mi Galería IA
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                Accede a todas las imágenes y diseños promocionales que has generado previamente.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                            <span>Ver mis imágenes</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>

                    {/* Card: Crear Flyer */}
                    <div
                        onClick={() => onNavigate('flyer')}
                        className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 hover:border-purple-500/50 hover:shadow-lg dark:hover:bg-slate-800/50 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                                <Wand2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Crear Flyer
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                Genera piezas gráficas a partir de tus descripciones utilizando IA.
                            </p>
                        </div>
                        <div className="mt-6 flex items-center text-purple-600 dark:text-purple-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                            <span>Iniciar creador</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>

                    {/* Card: Agregar Plantilla (Solo Admin) */}
                    {userRole === 'ADMIN' && (
                        <div
                            onClick={() => onNavigate('add-template')}
                            className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 hover:border-emerald-500/50 hover:shadow-lg dark:hover:bg-slate-800/50 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                                    <PlusSquare className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    Agregar Plantilla
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    Sube nuevas plantillas base y vistas previas a Cloudinary para el catálogo de usuarios.
                                </p>
                            </div>
                            <div className="mt-6 flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                                <span>Subir plantilla</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default HomeView;