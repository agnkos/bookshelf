import { useAuth } from "../../auth/hooks/useAuth"
import { useNavigate } from "react-router"

const Dashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleLogout}>log out</button>
    </>
  )
}

export default Dashboard
