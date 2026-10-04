import api from './axios';

export interface Template {
    id: string;
    title: string;
    description?: string;
    category: string;
    width: number;
    height: number;
    previewUrl: string;
    elements?: any;
    isPublic: boolean;
    createdById: string;
    createdAt: string;
}

export const getTemplatesApi = async (): Promise<Template[]> => {
    const { data } = await api.get<Template[]>('/templates');
    return data;
};

export const createTemplateApi = async (formData: FormData): Promise<Template> => {
    // Axios detecta FormData y asigna multipart/form-data junto con el 'boundary' automáticamente
    const { data } = await api.post<Template>('/templates', formData);
    return data;
};