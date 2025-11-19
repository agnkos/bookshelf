import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { prisma } from "../config/db"
import { getTokenDynamicPart } from "../utils/helpers"
import { issueTokens } from "../utils/tokens"

export const signupUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10)
  // TODO: Add check for existing user

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw new Error("User already exists")

  return prisma.user.create({ data: { email, password: hashed } })
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) throw new Error("Invalid credentials")

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error("Invalid credentials")

  const { accessToken, refreshToken } = issueTokens(user.id)

  const dynamicToken = getTokenDynamicPart(refreshToken)
  await prisma.user.update({
    where: { id: user.id },
    data: { refresh_token: dynamicToken },
  })
  return { accessToken, refreshToken }
}

export const logoutUser = async (token: string) => {
  const dynamicToken = getTokenDynamicPart(token)
  await prisma.user.updateMany({
    where: { refresh_token: dynamicToken },
    data: { refresh_token: null },
  })
}

export const getUserById = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  })
}

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  ) as any
  const dynamicToken = getTokenDynamicPart(refreshToken)
  const user = await prisma.user.findFirst({
    where: { refresh_token: dynamicToken },
  })
  if (!user || user.id !== decoded.id) throw new Error("Invalid token")

  return {
    id: decoded.id,
  }
}
