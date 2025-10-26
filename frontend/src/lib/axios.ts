import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
})

api.defaults.headers.common["Content-Type"] = "application/json"

// export const setHeaderToken = (token: string) => {
//   api.defaults.headers.common.Authorization = `Bearer ${token}`
// }

// export const removeHeaderToken = () => {
//   delete api.defaults.headers.common.Authorization
// }

// let accessToken: string | null = null;
// export const setAccessToken = (token: string | null) => (accessToken = token);

// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   if (accessToken) {
//     config.headers = {
//       ...config.headers,
//       Authorization: `Bearer ${accessToken}`
//     };
//   }
//   return config;
// });

export default api
