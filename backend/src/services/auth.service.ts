import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../config/db"

export const signupUser = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10)
  return prisma.user.create({ data: { email, password: hashed } })
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) throw new Error("Invalid credentials")

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error("Invalid credentials")

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  })
  return token
}
