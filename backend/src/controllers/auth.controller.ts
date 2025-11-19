import { Request, Response } from "express"
import jwt, { Secret } from "jsonwebtoken"
import {
  signupUser,
  loginUser,
  getUserById,
  refreshAccessToken,
  logoutUser,
} from "../services/auth.service"
import { prisma } from "../config/db"
import { getTokenDynamicPart } from "../utils/helpers"

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await signupUser(req.body.email, req.body.password)
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err || "Registration failed" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken, user } = await loginUser(
      req.body.email,
      req.body.password
    )
    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.status(200).json({ accessToken, user })
  } catch (err: unknown) {
    // TO DO: fix diff errors
    console.log("LOGIN ERRROR", err)
    res.status(401).json({ error: "Invalid credentials" })
  }
}

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.token) {
    return res.status(204).json({ message: "No content" })
  }
  try {
    await logoutUser(cookies.token)
    res.clearCookie("token", { httpOnly: true, sameSite: "none", secure: true })
    console.log("logout successsss")
    res.sendStatus(204)
  } catch (err: unknown) {
    console.log("Logout error:", err)
    if (err instanceof Error && err.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid credentials" })
    }
    res.status(500).json({ error: "Internal server error" })
  }
}

export const me = async (req: Request, res: Response) => {
  console.log("request me", req)
  const userId = Number((req as any).user.id)
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const user = await getUserById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    console.log("USER", user)
    res.json(user)
  } catch (err) {
    console.error("Error in meController:", err)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.token) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }
  const refreshToken = cookies.token

  try {
    // const decoded = jwt.verify(
    //   refreshToken,
    //   process.env.REFRESH_TOKEN_SECRET as Secret
    // ) as any

    // const dynamicToken = getTokenDynamicPart(refreshToken)
    // const user = await prisma.user.findFirst({
    //   where: { refresh_token: dynamicToken },
    // })
    // if (!user || user.id !== decoded.id) {
    //   return res.status(401).json({ message: "Invalid token" })
    // }

    // const tokenData = {
    //   id: decoded.id,
    // }
    const tokenData = await refreshAccessToken(refreshToken)

    const accessToken = jwt.sign(
      tokenData,
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: "10min" }
    )
    res.json({ accessToken })
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "Invalid token") {
      return res.status(401).json({ message: "Invalid token" })
    }
    res.status(500).json({ message: "Internal server error" })
  }
}
