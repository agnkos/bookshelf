import { useAuth } from "../../auth/hooks/useAuth"
import { useNavigate } from "react-router"

const Dashboard = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <div>Dashboard</div>
      <p>{user.email}</p>
      <button onClick={handleLogout}>log out</button>
    </>
  )
}

export default Dashboard
