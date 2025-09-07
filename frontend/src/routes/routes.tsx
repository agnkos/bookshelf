import { createBrowserRouter } from "react-router"
import Home from "../features/auth/pages/Home"
import Login from "../features/auth/pages/Login"
import Signup from "../features/auth/pages/Signup"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
])
