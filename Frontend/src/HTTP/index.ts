import axios from 'axios';
export const API_URL = `http://localhost:3000/api`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config.__isRetry) {
            originalRequest.__isRetry = true;
            try {
                const response = await axios.get<{accessToken: string}>(`${API_URL}/refresh`, { withCredentials: true });
                if (response.data.accessToken)
                    localStorage.setItem('accessToken', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.log('Не авторизованный пользователь')
            }
        }
        throw error;
    }
)

export default $api;