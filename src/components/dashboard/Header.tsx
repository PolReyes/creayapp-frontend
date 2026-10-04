// src/components/Header.tsx
import React from 'react';
import { Menu, Sparkles, Bell, Sun, Moon } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from './LogoutButton';

interface HeaderProps {
    onOpenSidebar: () => void;
    userRole?: 'ADMIN' | 'USER';
    userName?: string;
    userEmail?: string;
    theme?: Theme;
    onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    onOpenSidebar,
    //userRole = 'USER',
    userName = 'Usuario',
    userEmail = 'usuario@ejemplo.com',
    theme = 'dark',
    onToggleTheme,
}) => {
    const { user } = useAuth();
    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
            {/* Menú Móvil + Logo */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onOpenSidebar}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
                    aria-label="Abrir menú"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-2 lg:hidden">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-bold text-slate-900 dark:text-white text-lg">CreaYApp</span>
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex items-center gap-3 sm:gap-4">
                {/* BOTÓN MODO OSCURO / MODO CLARO */}
                {onToggleTheme && (
                    <button
                        onClick={onToggleTheme}
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-amber-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-indigo-600" />
                        )}
                    </button>
                )}

                {/* Notificaciones 
                <button className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
                </button>
                */}
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

                {/* Perfil*/}
                <div className="flex items-center gap-3">
                    {user && (
                        <>
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        </>
                    )}
                    <LogoutButton showText={false} />
                </div>
            </div>
        </header>
    );
};

export default Header;