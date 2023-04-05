import express from "express"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDb } from "./db"
import routerAuth from "./routes/auth.routes"

const app = express()

dotenv.config()

app.use(cors({
    credentials: true
}))

app.use( compression() )
app.use( cookieParser() )
app.use( express.json() )


app.use('/api/v1/auth', routerAuth)

connectDb()
    .then(() => {
        console.log("connect db")
    })
    .catch(err => {
        console.log("error connect to db", err?.message)
    })


app.listen(3000, () => {
    console.log('server on port 3000')
})