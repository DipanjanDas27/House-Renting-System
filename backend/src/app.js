import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import { errorHandler } from "./middlewares/error.middleware.js"
import { globalLimiter } from "./middlewares/rateLimiter.js";

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(cookieparser())
app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(errorHandler)
app.use(globalLimiter);

export {app}