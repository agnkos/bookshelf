import { useAuth } from "../../auth/hooks/useAuth"

const Dashboard = () => {
  const { logout } = useAuth()
  return (
    <>
      <div>Dashboard</div>
      <button onClick={() => logout()}>log out</button>
    </>
  )
}

export default Dashboard
