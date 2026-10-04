import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Si usas React Router
import { useAuth } from '../../context/AuthContext'; // Ajusta la ruta a tu AuthContext

interface LogoutButtonProps {
    className?: string;
    showText?: boolean;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
    className = '',
    showText = true
}) => {
    const { logout } = useAuth();
    const navigate = useNavigate(); // Omitir si usas window.location.href

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirige a la pantalla de login tras cerrar sesión
    };

    return (
        <button
            onClick={handleLogout}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20 cursor-pointer ${className}`}
            title="Cerrar sesión"
            type="button"
        >
            <LogOut className="w-4 h-4 shrink-0" />
            {showText && <span>Cerrar sesión</span>}
        </button>
    );
};

export default LogoutButton;