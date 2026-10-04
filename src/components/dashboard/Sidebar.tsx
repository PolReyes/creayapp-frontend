import React from 'react';
import { Home, PlusSquare, LayoutGrid, Wand2, Image, X, Sparkles } from 'lucide-react';

export type TabType = 'home' | 'add-template' | 'my-templates' | 'flyer' | 'gallery';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    userRole: 'ADMIN' | 'USER';
    activeTab: TabType;
    onSelectTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    onClose,
    userRole,
    activeTab = 'home',
    onSelectTab,
}) => {
    const menuItems = [
        { id: 'home', label: 'Inicio', icon: Home, show: true },
        { id: 'add-template', label: 'Agregar plantilla', icon: PlusSquare, show: userRole === 'ADMIN' },
        { id: 'my-templates', label: 'Mis plantillas', icon: LayoutGrid, show: userRole === 'ADMIN' },
        { id: 'flyer', label: 'Crear flyer', icon: Wand2, show: true },
        { id: 'gallery', label: 'Mi Galería', icon: Image, show: true },
    ];

    return (
        <>
            {/* Overlay Móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Contenedor Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Header del Sidebar */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
                        <Sparkles className="w-6 h-6 text-indigo-500" />
                        <span>CreaYApp</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Links de Navegación */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {menuItems
                        .filter((item) => item.show)
                        .map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onSelectTab(item.id as TabType);
                                        onClose();
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                </nav>

                {/* Badge de Rol */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="px-3 py-2 rounded-lg flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                        <span>Rol de acceso:</span>
                        <span
                            className={`font-semibold px-2 py-0.5 rounded ${userRole === 'ADMIN'
                                    ? 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-500/30'
                                    : 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30'
                                }`}
                        >
                            {userRole}
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;