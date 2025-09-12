import express from "express"
import { login, me, signup } from "../controllers/auth.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/me", authMiddleware, me)

router.get("/debug", (req, res) => {
  res.send("Auth routes working")
})

export default router
