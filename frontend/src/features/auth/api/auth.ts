import api from "../../../lib/axios"

export const login = async (email: string, password: string) => {
  const { data } = await api.post(
    "/auth/login",
    { email, password },
    { withCredentials: true }
  )
  return data
}

export const logout = async () => {
  await api.post("/auth/logout", {}, { withCredentials: true })
}

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me", { withCredentials: true })
  console.log("user data", data)
  return data
}

export const refreshAccessToken = async () => {
  const { data } = await api.post("/auth/refresh", { withCredentials: true })
  console.log("data access token:", data)
  return data.accessToken
}
