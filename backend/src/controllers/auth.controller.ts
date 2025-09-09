import { Request, Response } from "express"
import { signupUser, loginUser } from "../services/auth.service"

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await signupUser(req.body.email, req.body.password)
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: "Registration failed" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body.email, req.body.password)
    res.cookie("token", token, { httpOnly: true, secure: true })
    res.json({ message: "Login successful" })
  } catch {
    res.status(401).json({ error: "Invalid credentials" })
  }
}
