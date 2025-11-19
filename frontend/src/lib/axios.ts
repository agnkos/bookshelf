import axios from "axios"
import { QueryClient } from "@tanstack/react-query"

import { logout, refreshAccessToken } from "../features/auth/api/auth"

const queryClient = new QueryClient()

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
      try {
        const accessToken = await refreshAccessToken()
        setAccessToken(accessToken)
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        console.log("accessToken", accessToken)
        return api.request(originalRequest)
      } catch (err) {
        console.log("err", err)
        await logout()
        queryClient.removeQueries({ queryKey: ["user"] })
      }
    }
    return Promise.reject(error)
  }
)

export default api
