import express from "express"
import dotenv from "dotenv"
import connectDB from "./Configs/ConnectDB.js"
import authRouter from "./Routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./Routes/user.route.js"
import assistantRouter from "./Routes/assistant.route.js"
import billingRouter from "./Routes/billing.route.js"


const app = express()
app.set("trust proxy", 1)

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean)

const privateCors = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (
      allowedOrigins.includes(origin) ||
      (process.env.CLIENT_URL && origin.startsWith(process.env.CLIENT_URL))
    ) {
      return callback(null, true)
    }
    // Also allow any origin in development
    if (process.env.NODE_ENV !== "production") {
      return callback(null, true)
    }
    return callback(null, true)
  },
  credentials: true,
})

const publicCors = cors({
  origin: "*",
})

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
  res.json("Hello from Server")
})

app.use("/api/auth", privateCors, authRouter)
app.use("/api/user", privateCors, userRouter)
app.use("/api/billing", privateCors, billingRouter)

app.use("/api/assistant", publicCors, assistantRouter)
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`)
  connectDB()
})