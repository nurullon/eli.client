import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import { router } from '@/routers/index.js'

const { cookies } = useCookies();

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 0,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = cookies.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        const language = "en";
        config.headers['Accept-Language'] = language;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.status === 401) {
            cookies.remove('token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('patientId');
            router.push({ name: 'login' });
            console.error(error);
        } else if (error.status === 403) {
            try {
                // add refresh token logic here if needed

            } catch (error) {
                cookies.remove('token');
                localStorage.removeItem('authToken');
                localStorage.removeItem('patientId');
                console.error(error);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;