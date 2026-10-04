import api from './axios';

export interface Design {
    id: string;
    userId: string;
    topic: string;
    title?: string;
    subtitle?: string;
    companyName?: string;
    phone?: string;
    primaryColor?: string;
    generatedUrl: string;
    assets: string[];
    createdAt: string;
}

export const getMyDesignsApi = async (): Promise<Design[]> => {
    const { data } = await api.get<Design[]>('/ai/my-designs');
    return data;
};

export const generateBannerApi = async (formData: FormData): Promise<Design> => {
    const { data } = await api.post<Design>('/ai/generate', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};