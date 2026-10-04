import React, { useState, useRef } from 'react';
import {
    ArrowLeft, Download, Building2, Type, Clock,
    Plus, Trash2, Image as ImageIcon, Move, Wand2, ZoomIn,
} from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';
import type { AdminTemplate } from '../../types/flyer.type';

const FONT_OPTIONS = [
    { name: 'Bebas Neue', value: "'Bebas Neue', sans-serif" },
    { name: 'Anton', value: "'Anton', sans-serif" },
    { name: 'Oswald', value: "'Oswald', sans-serif" },
    { name: 'Montserrat', value: "'Montserrat', sans-serif" },
    { name: 'Archivo', value: "'Archivo', sans-serif" },
];

// SVG Paths para renderizado en Canvas y en UI
const SOCIAL_SVG_PATHS = {
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    whatsapp: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z',
    tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.3 2.56.01 1.01.55 1.97 1.38 2.51.93.61 2.14.65 3.1.12.93-.51 1.52-1.52 1.54-2.58.02-5.46.01-10.92.02-16.38z',
};

const SOCIAL_ICONS = {
    facebook: (
        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d={SOCIAL_SVG_PATHS.facebook} />
        </svg>
    ),
    instagram: (
        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d={SOCIAL_SVG_PATHS.instagram} />
        </svg>
    ),
    whatsapp: (
        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d={SOCIAL_SVG_PATHS.whatsapp} />
        </svg>
    ),
    tiktok: (
        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
            <path d={SOCIAL_SVG_PATHS.tiktok} />
        </svg>
    ),
};

export interface CanvasLayer {
    id: string;
    type: 'text' | 'image' | 'social';
    text?: string;
    socialNetwork?: 'facebook' | 'instagram' | 'whatsapp' | 'tiktok';
    imageElement?: HTMLImageElement;
    x: number; // Porcentaje
    y: number; // Porcentaje
    fontSize: number;
    color: string;
    fontFamily: string;
}

interface Props {
    template: AdminTemplate;
    onBack: () => void;
}

export const TemplateEditor: React.FC<Props> = ({ template, onBack }) => {
    const [layers, setLayers] = useState<CanvasLayer[]>([
        {
            id: 'brand',
            type: 'text',
            text: 'Tu Nombre o Marca',
            x: 50,
            y: 15,
            fontSize: 32,
            color: '#ffffff',
            fontFamily: "'Bebas Neue', sans-serif",
        },
        {
            id: 'classType',
            type: 'text',
            text: 'Tipo de Clase / Evento',
            x: 50,
            y: 45,
            fontSize: 42,
            color: '#6366f1',
            fontFamily: "'Anton', sans-serif",
        },
        {
            id: 'schedule',
            type: 'text',
            text: 'Lun - Vie: 7:00 PM',
            x: 50,
            y: 72,
            fontSize: 24,
            color: '#ffffff',
            fontFamily: "'Oswald', sans-serif",
        },
    ]);

    const [selectedLayerId, setSelectedLayerId] = useState<string>('brand');
    const [isProcessingBg, setIsProcessingBg] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedLayerId, setDraggedLayerId] = useState<string | null>(null);

    const selectedLayer = layers.find((l) => l.id === selectedLayerId);

    // Subir imagen
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgUrl = event.target?.result as string;
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.src = imgUrl;
                img.onload = () => {
                    const newImageLayer: CanvasLayer = {
                        id: `img-${Date.now()}`,
                        type: 'image',
                        imageElement: img,
                        x: 50,
                        y: 50,
                        fontSize: 40,
                        color: '#ffffff',
                        fontFamily: '',
                    };
                    setLayers((prev) => [...prev, newImageLayer]);
                    setSelectedLayerId(newImageLayer.id);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveBackground = async () => {
        if (!selectedLayer || selectedLayer.type !== 'image' || !selectedLayer.imageElement) return;

        setIsProcessingBg(true);

        try {
            // Usamos removeBackground directamente
            const blob = await removeBackground(selectedLayer.imageElement.src);
            const resultUrl = URL.createObjectURL(blob);

            const newImg = new Image();
            newImg.src = resultUrl;
            newImg.onload = () => {
                updateSelectedLayer('imageElement', newImg);
                setIsProcessingBg(false);
            };
        } catch (error) {
            console.error('Error al remover el fondo:', error);
            alert('Ocurrió un error al procesar la imagen.');
            setIsProcessingBg(false);
        }
    };
    const handleAddSocial = (network: 'facebook' | 'instagram' | 'whatsapp' | 'tiktok') => {
        const newId = `social-${Date.now()}`;
        const newSocialLayer: CanvasLayer = {
            id: newId,
            type: 'social',
            text: `@tu_cuenta`,
            socialNetwork: network,
            x: 50,
            y: 85,
            fontSize: 20,
            color: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
        };
        setLayers((prev) => [...prev, newSocialLayer]);
        setSelectedLayerId(newId);
    };

    const updateSelectedLayer = (field: keyof CanvasLayer, value: any) => {
        setLayers((prev) =>
            prev.map((l) => (l.id === selectedLayerId ? { ...l, [field]: value } : l))
        );
    };

    const handleDeleteLayer = (id: string) => {
        setLayers((prev) => prev.filter((l) => l.id !== id));
        if (selectedLayerId === id) setSelectedLayerId(layers[0]?.id || '');
    };

    // 2. MEJORA: DESCARGA FIDEODIGITAL Y MATEMÁTICAMENTE IDÉNTICA A LA PREVISUALIZACIÓN
    const handleDownloadFlyer = async () => {
        if (!containerRef.current) return;

        // Tomamos la escala basada en el tamaño real del lienzo de previsualización (ej. 512px)
        const previewBounds = containerRef.current.getBoundingClientRect();
        const PREVIEW_SIZE = previewBounds.width;
        const TARGET_SIZE = 1080; // Alta Resolución HD
        const scaleFactor = TARGET_SIZE / PREVIEW_SIZE;

        const canvas = document.createElement('canvas');
        canvas.width = TARGET_SIZE;
        canvas.height = TARGET_SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Asegurar carga de tipografías
        await document.fonts.ready;

        // 1. Fondo de la Plantilla
        const bgImg = new Image();
        bgImg.crossOrigin = 'anonymous';
        bgImg.src = template.imageUrl;
        await new Promise((resolve) => {
            bgImg.onload = resolve;
        });

        ctx.drawImage(bgImg, 0, 0, TARGET_SIZE, TARGET_SIZE);

        // Overlay Oscuro
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(0, 0, TARGET_SIZE, TARGET_SIZE);

        // 2. Renderizar Capas de Forma Fiel al CSS Preview
        for (const layer of layers) {
            const posX = (layer.x / 100) * TARGET_SIZE;
            const posY = (layer.y / 100) * TARGET_SIZE;

            if (layer.type === 'image' && layer.imageElement) {
                const renderWidth = (layer.fontSize * 3) * scaleFactor;
                const aspectRatio = layer.imageElement.naturalHeight / layer.imageElement.naturalWidth;
                const renderHeight = renderWidth * aspectRatio;

                ctx.drawImage(
                    layer.imageElement,
                    posX - renderWidth / 2,
                    posY - renderHeight / 2,
                    renderWidth,
                    renderHeight
                );
            } else if (layer.type === 'text') {
                const fontPx = layer.fontSize * scaleFactor;
                ctx.font = `bold ${fontPx}px ${layer.fontFamily}`;
                ctx.fillStyle = layer.color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
                ctx.shadowBlur = 8 * scaleFactor;
                ctx.shadowOffsetX = 2 * scaleFactor;
                ctx.shadowOffsetY = 2 * scaleFactor;

                ctx.fillText(layer.text || '', posX, posY);
                ctx.shadowColor = 'transparent';
            } else if (layer.type === 'social' && layer.socialNetwork) {
                const fontPx = layer.fontSize * scaleFactor;
                ctx.font = `500 ${fontPx}px ${layer.fontFamily}`;

                // Medir ancho del texto
                const textMetrics = ctx.measureText(layer.text || '');
                const iconSize = fontPx * 0.9;
                const padding = 8 * scaleFactor;
                const totalWidth = iconSize + padding + textMetrics.width;

                const startX = posX - totalWidth / 2;

                // Dibujar Círculo Blanco de Fondo del Ícono
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.beginPath();
                ctx.arc(startX + iconSize / 2, posY, iconSize * 0.75, 0, Math.PI * 2);
                ctx.fill();

                // Dibujar Vector del Ícono de Red Social
                const path2D = new Path2D(SOCIAL_SVG_PATHS[layer.socialNetwork]);
                ctx.save();
                ctx.translate(startX, posY - iconSize / 2);
                const iconScale = iconSize / 24;
                ctx.scale(iconScale, iconScale);
                ctx.fillStyle = '#0f172a';
                ctx.fill(path2D);
                ctx.restore();

                // Dibujar Texto de la Red Social
                ctx.fillStyle = layer.color;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
                ctx.shadowBlur = 6 * scaleFactor;
                ctx.fillText(layer.text || '', startX + iconSize + padding, posY);
                ctx.shadowColor = 'transparent';
            }
        }

        // 3. Descarga Directa
        const link = document.createElement('a');
        link.download = `flyer-${template.title.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    };

    // Arrastre
    const handleStartDrag = (id: string, e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setSelectedLayerId(id);
        setIsDragging(true);
        setDraggedLayerId(id);
    };

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging || !draggedLayerId || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        let newX = ((clientX - rect.left) / rect.width) * 100;
        let newY = ((clientY - rect.top) / rect.height) * 100;

        newX = Math.max(0, Math.min(100, newX));
        newY = Math.max(0, Math.min(100, newY));

        setLayers((prev) =>
            prev.map((l) => (l.id === draggedLayerId ? { ...l, x: newX, y: newY } : l))
        );
    };

    const handleEndDrag = () => {
        setIsDragging(false);
        setDraggedLayerId(null);
    };

    return (
        <div className="space-y-6 select-none" onMouseUp={handleEndDrag} onTouchEnd={handleEndDrag}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver</span>
                </button>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white hidden sm:block">
                    Personalizar Flyer
                </h3>

                <button
                    type="button"
                    onClick={handleDownloadFlyer}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                    <Download className="w-4 h-4" />
                    <span>Descargar Flyer HD</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* PANEL IZQUIERDO */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Edición de Contenido
                    </h4>

                    {/* Textos Principales */}
                    <div className="space-y-4">
                        {layers.map((layer) => {
                            if (layer.type === 'text') {
                                return (
                                    <div
                                        key={layer.id}
                                        onClick={() => setSelectedLayerId(layer.id)}
                                        className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedLayerId === layer.id
                                            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10'
                                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                                {layer.id === 'brand' && <Building2 className="w-3.5 h-3.5 text-indigo-500" />}
                                                {layer.id === 'classType' && <Type className="w-3.5 h-3.5 text-indigo-500" />}
                                                {layer.id === 'schedule' && <Clock className="w-3.5 h-3.5 text-indigo-500" />}
                                                {layer.id === 'brand'
                                                    ? 'Tu Nombre o Marca'
                                                    : layer.id === 'classType'
                                                        ? 'Tipo de Clase'
                                                        : 'Horario'}
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            value={layer.text || ''}
                                            onChange={(e) =>
                                                setLayers((prev) =>
                                                    prev.map((l) => (l.id === layer.id ? { ...l, text: e.target.value } : l))
                                                )
                                            }
                                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Redes Sociales */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                            Redes Sociales Opcionales
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {(['facebook', 'instagram', 'whatsapp', 'tiktok'] as const).map((net) => (
                                <button
                                    key={net}
                                    type="button"
                                    onClick={() => handleAddSocial(net)}
                                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg text-xs font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors"
                                >
                                    {SOCIAL_ICONS[net]}
                                    <span className="capitalize">{net}</span>
                                    <Plus className="w-3 h-3 ml-0.5" />
                                </button>
                            ))}
                        </div>

                        {layers
                            .filter((l) => l.type === 'social')
                            .map((s) => (
                                <div key={s.id} className="flex items-center gap-2 mt-2">
                                    <span className="p-2 bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                        {s.socialNetwork && SOCIAL_ICONS[s.socialNetwork]}
                                    </span>
                                    <input
                                        type="text"
                                        value={s.text || ''}
                                        onChange={(e) =>
                                            setLayers((prev) =>
                                                prev.map((l) => (l.id === s.id ? { ...l, text: e.target.value } : l))
                                            )
                                        }
                                        className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white"
                                    />
                                    <button
                                        onClick={() => handleDeleteLayer(s.id)}
                                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                    </div>

                    {/* Subir Foto / Logo Personal */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                            Agregar Imagen / Logo
                        </label>
                        <label className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-800 hover:border-indigo-500 rounded-xl cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-all">
                            <ImageIcon className="w-4 h-4" />
                            <span>Subir imagen desde tu dispositivo</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                    </div>

                    {/* CONTROL DE CAPA SELECCIONADA */}
                    {selectedLayer && (
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                    Ajustar Elemento Seleccionado
                                </span>
                                {selectedLayer.type !== 'text' && (
                                    <button
                                        onClick={() => handleDeleteLayer(selectedLayer.id)}
                                        className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Borrar
                                    </button>
                                )}
                            </div>

                            {/* Slider de Tamaño */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                                    <span className="flex items-center gap-1">
                                        <ZoomIn className="w-3.5 h-3.5" /> Tamaño / Escala
                                    </span>
                                    <span>{selectedLayer.fontSize}{selectedLayer.type === 'image' ? '%' : 'px'}</span>
                                </div>
                                <input
                                    type="range"
                                    min={selectedLayer.type === 'image' ? '10' : '12'}
                                    max={selectedLayer.type === 'image' ? '100' : '96'}
                                    value={selectedLayer.fontSize}
                                    onChange={(e) => updateSelectedLayer('fontSize', Number(e.target.value))}
                                    className="w-full accent-indigo-600 cursor-pointer"
                                />
                            </div>

                            {/* Opciones Avanzadas para Remover Fondo */}
                            {selectedLayer.type === 'image' && (
                                <button
                                    type="button"
                                    disabled={isProcessingBg}
                                    onClick={handleRemoveBackground}
                                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                                >
                                    <Wand2 className={`w-4 h-4 ${isProcessingBg ? 'animate-spin' : ''}`} />
                                    <span>{isProcessingBg ? 'Quitando fondo...' : 'Quitar Fondo'}</span>
                                </button>
                            )}

                            {/* Controles para Texto */}
                            {selectedLayer.type !== 'image' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                                            Tipografía
                                        </label>
                                        <select
                                            value={selectedLayer.fontFamily}
                                            onChange={(e) => updateSelectedLayer('fontFamily', e.target.value)}
                                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium text-slate-900 dark:text-white"
                                        >
                                            {FONT_OPTIONS.map((f) => (
                                                <option key={f.name} value={f.value}>
                                                    {f.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                                            Color de Texto
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                value={selectedLayer.color}
                                                onChange={(e) => updateSelectedLayer('color', e.target.value)}
                                                className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0 overflow-hidden"
                                            />
                                            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase">
                                                {selectedLayer.color}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* LIENZO DE PREVISUALIZACIÓN */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <Move className="w-3.5 h-3.5" /> Arrastra libremente los elementos
                        </span>
                    </div>

                    <div
                        ref={containerRef}
                        onMouseMove={handleMove}
                        onTouchMove={handleMove}
                        className="relative aspect-square w-full max-w-lg mx-auto bg-slate-950 rounded-2xl overflow-hidden shadow-2xl touch-none select-none border border-slate-800"
                    >
                        <img
                            src={template.imageUrl}
                            alt={template.title}
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                        {layers.map((layer) => (
                            <div
                                key={layer.id}
                                onMouseDown={(e) => handleStartDrag(layer.id, e)}
                                onTouchStart={(e) => handleStartDrag(layer.id, e)}
                                style={{
                                    left: `${layer.x}%`,
                                    top: `${layer.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                                className={`absolute cursor-move whitespace-nowrap transition-shadow rounded px-2 py-1 ${selectedLayerId === layer.id
                                    ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-black/50 bg-black/30 backdrop-blur-xs'
                                    : 'hover:ring-1 hover:ring-white/50'
                                    }`}
                            >
                                {layer.type === 'text' && (
                                    <p
                                        style={{
                                            fontSize: `${layer.fontSize}px`,
                                            color: layer.color,
                                            fontFamily: layer.fontFamily,
                                        }}
                                        className="drop-shadow-lg leading-none font-bold"
                                    >
                                        {layer.text || 'Texto...'}
                                    </p>
                                )}

                                {layer.type === 'social' && (
                                    <div className="flex items-center gap-2">
                                        <span className="p-1 bg-white/90 text-slate-900 rounded-full shadow-md">
                                            {layer.socialNetwork && SOCIAL_ICONS[layer.socialNetwork]}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: `${layer.fontSize}px`,
                                                color: layer.color,
                                                fontFamily: layer.fontFamily,
                                            }}
                                            className="drop-shadow-md font-medium"
                                        >
                                            {layer.text}
                                        </span>
                                    </div>
                                )}

                                {layer.type === 'image' && layer.imageElement && (
                                    <img
                                        src={layer.imageElement.src}
                                        alt="Imagen usuario"
                                        style={{ width: `${layer.fontSize * 3}px` }}
                                        className="shadow-2xl object-contain pointer-events-none rounded-lg"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};