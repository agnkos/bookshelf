import jwt, { Secret } from "jsonwebtoken"

export const issueTokens = (userId: number) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: "10m" }
  )

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET as Secret,
    { expiresIn: "1d" }
  )

  return { accessToken, refreshToken }
}
