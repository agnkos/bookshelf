import { Request, Response, NextFunction } from "express"
import jwt, { Secret } from "jsonwebtoken"
import { UserPayload } from "../types/types"

interface AuthRequest extends Request {
  user?: UserPayload
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // const token = req.cookies.token
  const token = req.header("Authorization")?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  //   ;(req as any).user = decoded
  //   next()
  // } catch {
  //   res.status(401).json({ error: "Invalid token" })
  // }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" })
      req.user = decoded as UserPayload
      next()
    }
  )
}
