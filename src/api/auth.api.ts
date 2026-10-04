import api from './axios';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    avatarUrl?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export const loginApi = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
};

export const registerApi = async (userData: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    return data;
};

export const googleAuthApi = async (idToken: string): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/google', { idToken });
    return data;
};