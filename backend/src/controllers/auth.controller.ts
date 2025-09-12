import { Request, Response } from "express"
import { signupUser, loginUser, getUserById } from "../services/auth.service"

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

export const me = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (err) {
    console.error("Error in meController:", err)
    res.status(500).json({ message: "Internal server error" })
  }
}
