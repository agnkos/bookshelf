import axios from "axios"

export const login = async (email: string, password: string) => {
  await axios.post("", { email, password }, { withCredentials: true })
}

export const logout = async () => {
  await axios.post("", {}, { withCredentials: true })
}

export const getCurrentUser = async () => {
  const { data } = await axios.get("", { withCredentials: true })
  return data
}
