import axios from 'axios';

const BASE_URL = 'https://api.polza.ai/api/v1';

// Мы будем использовать проп или env для ключа
const API_KEY = import.meta.env.VITE_POLZA_API_KEY;

export interface GenerationResponse {
    requestId: string;
}

export interface StatusResponse {
    id: string;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    url?: string;
}

export const polzaApi = {
    /**
     * Создать задачу генерации (Image-to-Image)
     */
    generateImage: async (base64Image: string, prompt: string): Promise<string> => {
        if (!API_KEY) {
            throw new Error('API Key is missing. Please add VITE_POLZA_API_KEY to your .env file.');
        }

        // Polza AI ожидает полный Base64 URL (data:image/...)
        const fullBase64 = base64Image.startsWith('data:')
            ? base64Image
            : `data:image/jpeg;base64,${base64Image}`;

        const response = await axios.post<GenerationResponse>(
            `${BASE_URL}/images/generations`,
            {
                model: 'nano-banana-edit',
                filesBase64: [fullBase64],
                prompt: prompt,
                size: 'auto'
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.requestId;
    },

    /**
     * Проверить статус генерации
     */
    checkStatus: async (requestId: string): Promise<StatusResponse> => {
        const response = await axios.get<StatusResponse>(
            `${BASE_URL}/images/${requestId}`,
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );

        return response.data;
    },

    /**
     * Полный цикл: подождать завершения
     */
    pollResult: async (requestId: string, onProgress?: (status: string) => void): Promise<string> => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
                try {
                    const statusData = await polzaApi.checkStatus(requestId);
                    onProgress?.(statusData.status);

                    if (statusData.status === 'COMPLETED' && statusData.url) {
                        clearInterval(interval);
                        resolve(statusData.url);
                    } else if (statusData.status === 'FAILED') {
                        clearInterval(interval);
                        reject(new Error('Generation failed on Polza AI server'));
                    }
                } catch (error) {
                    clearInterval(interval);
                    reject(error);
                }
            }, 2000); // Опрос каждые 2 секунды
        });
    }
};
