import { NavLink } from "react-router-dom"

type AuthButtonProps = {
  text: string
  link: string
}

const AuthButton = ({ text, link }: AuthButtonProps) => {
  return (
    <NavLink
      to={link}
      className="w-11/12 px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md"
    >
      {text}
    </NavLink>
  )
}
export default AuthButton
