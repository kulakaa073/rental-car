import axios from 'axios';
import type { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
});

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response.data; // check for actual response structure!!!
});

interface TransformedAxios {
  get<T>(url: string): Promise<T>;
  post<T, D = unknown>(url: string, data?: D): Promise<T>;
  patch<T, D = unknown>(url: string, data?: D): Promise<T>;
}

const api = axiosInstance as unknown as TransformedAxios;

export default api;
