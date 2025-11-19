import axios from "axios"
import { refreshAccessToken } from "../features/auth/api/auth"

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

let accessToken: string | null = null
export const setAccessToken = (token: string | null) => (accessToken = token)

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// TO DO: correct setting headers with []
// TO DO: add redirect to login page if refresh also fails
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      console.log("error response", error.response)
      console.log("refreshing token...")
      const newAccessToken = await refreshAccessToken()
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return api.request(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default api
