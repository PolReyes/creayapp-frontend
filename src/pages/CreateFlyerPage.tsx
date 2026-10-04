import React, { useState } from 'react';
import type { CreationMode, AdminTemplate } from '../types/flyer.type';
import { CreationModeSelector } from '../components/flyers/CreationModeSelector';
import { TemplateGallery } from '../components/flyers/TemplateGallery';
import { TemplateEditor } from '../components/flyers/TemplateEditor';
import { AIDesignForm } from '../components/forms/AIDesignForm';
import type { Design } from '../api/ai.api';
import { Sparkles, Download, ExternalLink, RefreshCw } from 'lucide-react';

export const CreateFlyerPage: React.FC = () => {
    const [mode, setMode] = useState<CreationMode>('selection');
    const [selectedTemplate, setSelectedTemplate] = useState<AdminTemplate | null>(null);

    // Estado para guardar la imagen creada por la IA y mostrar la vista previa
    const [generatedDesign, setGeneratedDesign] = useState<Design | null>(null);

    // Función auxiliar para resetear estados al volver a la selección principal
    const handleBackToSelection = () => {
        setMode('selection');
        setSelectedTemplate(null);
        setGeneratedDesign(null);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Paso 1: Selección de Modo */}
            {mode === 'selection' && (
                <CreationModeSelector
                    onSelectMode={(selected) => {
                        setMode(selected);
                        setGeneratedDesign(null); // Limpiar vistas previas anteriores
                    }}
                />
            )}

            {/* Paso 2A: Selección de Plantilla de Administrador */}
            {mode === 'template' && !selectedTemplate && (
                <TemplateGallery
                    onSelectTemplate={(template) => setSelectedTemplate(template)}
                    onBack={handleBackToSelection}
                />
            )}

            {/* Paso 2B: Edición de la Plantilla escogida */}
            {mode === 'template' && selectedTemplate && (
                <TemplateEditor
                    template={selectedTemplate}
                    onBack={() => setSelectedTemplate(null)}
                />
            )}

            {/* Paso 3: Flujo de Creación con IA */}
            {mode === 'ai' && (
                <div className="space-y-4">
                    {/* Botón de navegación cuando aún no hay diseño o se está editando el formulario */}
                    {!generatedDesign && (
                        <div className="flex items-center justify-between max-w-2xl mx-auto">
                            <button
                                onClick={handleBackToSelection}
                                className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium transition-colors cursor-pointer"
                            >
                                ← Volver a opciones
                            </button>
                        </div>
                    )}

                    {/* VISTA A: Formulario de Generación */}
                    {!generatedDesign ? (
                        <AIDesignForm
                            onSuccess={(newDesign: Design) => {
                                // Al completar la llamada a la API, guardamos el resultado
                                setGeneratedDesign(newDesign);
                            }}
                        />
                    ) : (
                        /* VISTA B: Vista Previa y Acciones del Diseño Generado */
                        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all space-y-6">
                            {/* Cabecera */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-500" />
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                        ¡Tu diseño ha sido generado!
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setGeneratedDesign(null)}
                                    className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" /> Crear otro
                                </button>
                            </div>

                            {/* Vista previa de la imagen */}
                            <div className="flex justify-center bg-zinc-100 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
                                <img
                                    src={generatedDesign.generatedUrl}
                                    alt={generatedDesign.topic || 'Diseño generado por IA'}
                                    className="max-h-[500px] w-auto object-contain rounded-lg shadow-md"
                                />
                            </div>

                            {/* Acciones para el usuario */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <a
                                    href={generatedDesign.generatedUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download="diseno-ia.png"
                                    className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    Descargar Imagen
                                </a>
                                <button
                                    onClick={handleBackToSelection}
                                    className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium rounded-xl text-sm transition-colors cursor-pointer"
                                >
                                    Volver al Inicio
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateFlyerPage;