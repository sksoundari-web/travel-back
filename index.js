import express from "express"
import mongoose from "mongoose"

import cookieParser from "cookie-parser"
import path from "path"
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import travelStoryRoutes from "./routes/travelStory.route.js"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// Enable CORS for frontend (Replace with your frontend URL)
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173" , "https://travel-front-sigma.vercel.app"], //frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow CRUD operations
    credentials: true, // Allow cookies & authorization headers
  })
)

app.use(cookieParser())

// for allowing json object in req body
app.use(express.json())

const PORT = process.env.PORT || 3000
app.listen(PORT,  "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}!`)
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes) 
app.use("/api/travel-story", travelStoryRoutes)

// server static files from the uploads and assets directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/assets", express.static(path.join(__dirname, "assets")))

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
