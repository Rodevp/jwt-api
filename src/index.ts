import express from "express"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    credentials: true
}))

app.use( compression() )
app.use( cookieParser() )
app.use( express.json() )





app.listen(3000, () => {
    console.log('server on port 3000')
})