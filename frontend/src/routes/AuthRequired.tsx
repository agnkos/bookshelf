import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../features/auth/hooks/useAuth"

export default function AuthRequired() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
