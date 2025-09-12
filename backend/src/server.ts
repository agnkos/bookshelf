import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes"
import { corsOptions } from "./config/corsOptions"
import { credentials } from "./middleware/credentials"

dotenv.config()

const app = express()

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// )
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("backend is running ")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
