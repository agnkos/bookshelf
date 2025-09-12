import api from "../../../lib/axios"

export const login = async (email: string, password: string) => {
  await api.post("/auth/login", { email, password }, { withCredentials: true })
}

export const logout = async () => {
  await api.post("/auth/logout", {}, { withCredentials: true })
}

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me", { withCredentials: true })
  return data
}
