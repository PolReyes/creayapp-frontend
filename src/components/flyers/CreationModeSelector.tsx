import React from 'react';
import { Sparkles, LayoutTemplate } from 'lucide-react';
import type { CreationMode } from '../../types/flyer.type';

interface Props {
    onSelectMode: (mode: CreationMode) => void;
}

export const CreationModeSelector: React.FC<Props> = ({ onSelectMode }) => {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    ¿Cómo deseas crear tu Flyer?
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Elige la opción que mejor se adapte a lo que necesitas hoy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Opción 1: Plantillas Prediseñadas */}
                <button
                    onClick={() => onSelectMode('template')}
                    className="group relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl p-8 text-left transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
                >
                    <div>
                        <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                            <LayoutTemplate className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Usar Plantilla
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                            Elige entre las plantillas oficiales creadas por el administrador y personaliza tus datos en segundos.
                        </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        <span>Explorar plantillas</span>
                        <span>&rarr;</span>
                    </div>
                </button>

                {/* Opción 2: Generar con IA */}
                <button
                    onClick={() => onSelectMode('ai')}
                    className="group relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl p-8 text-left transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
                >
                    <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        Recomendado
                    </div>
                    <div>
                        <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Crear con IA
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                            Describe tu idea, producto o promoción y deja que la Inteligencia Artificial genere un diseño exclusivo.
                        </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        <span>Generar diseño único</span>
                        <span>&rarr;</span>
                    </div>
                </button>
            </div>
        </div>
    );
};