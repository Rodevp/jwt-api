import express from "express"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDb } from "./db"

const app = express()

dotenv.config()

app.use(cors({
    credentials: true
}))

app.use( compression() )
app.use( cookieParser() )
app.use( express.json() )


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