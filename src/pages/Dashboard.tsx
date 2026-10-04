import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import type { TabType } from '../components/dashboard/Sidebar';
import { HomeView } from '../components/dashboard/HomeView';
import { AddTemplateForm } from '../components/forms/TemplateForm';
import { AdminTemplatesList } from '../components/dashboard/AdminTemplatesList';
import MyGallery from '../components/dashboard/MyGallery';
import CreateFlyerPage from './CreateFlyerPage';

interface DashboardProps {
    userRole?: 'ADMIN' | 'USER';
    userName?: string;
    userEmail?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
    userRole = 'USER', // 1. Solución: Asignar 'USER' por defecto si viene undefined
    userName,
    userEmail,
}) => {
    const [activeTab, setActiveTab] = useState<TabType>('home');

    // 2. Solución: Tipar la entrada como string para que coincida con DashboardLayout
    const handleTabChange = (tab: string) => {
        const targetTab = tab as TabType;

        // Proteger rutas de admin
        if ((targetTab === 'add-template' || targetTab === 'my-templates') && userRole !== 'ADMIN') {
            return;
        }
        setActiveTab(targetTab);
    };

    return (
        <DashboardLayout
            userRole={userRole}
            userName={userName}
            userEmail={userEmail}
            activeTab={activeTab}
            onTabChange={handleTabChange}
        >
            {activeTab === 'home' && (
                <HomeView userRole={userRole} onNavigate={handleTabChange} />
            )}

            {activeTab === 'add-template' && userRole === 'ADMIN' && (
                <AddTemplateForm />
            )}

            {activeTab === 'my-templates' && userRole === 'ADMIN' && (
                <AdminTemplatesList />
            )}

            {activeTab === 'flyer' && (
                <CreateFlyerPage />
            )}

            {activeTab === 'gallery' && (
                <MyGallery />
            )}
        </DashboardLayout>
    );
};

export default Dashboard;