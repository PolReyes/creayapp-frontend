// src/layouts/DashboardLayout.tsx
import React, { useState } from 'react';
import Sidebar, { type TabType } from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import { useTheme } from '../../hooks/useTheme';

interface DashboardLayoutProps {
    children: React.ReactNode;
    userRole?: 'ADMIN' | 'USER';
    userName?: string;
    userEmail?: string;
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    userRole = 'USER',
    userName,
    userEmail,
    activeTab,
    onTabChange,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                userRole={userRole}
                activeTab={activeTab}
                onSelectTab={onTabChange}
            />

            {/* Contenido Principal */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header
                    onOpenSidebar={() => setSidebarOpen(true)}
                    userRole={userRole}
                    userName={userName}
                    userEmail={userEmail}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;