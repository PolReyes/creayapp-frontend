export type CreationMode = 'selection' | 'template' | 'ai';

export interface AdminTemplate {
    id: string;
    title: string;
    category: string;
    imageUrl: string; // Imagen base sin texto o con marcadores
}

export interface TemplateFormData {
    brandName: string;   // "Tu nombre o marca"
    primaryText: string; // Título principal o promoción
    contactInfo: string; // Teléfono, dirección o redes
}