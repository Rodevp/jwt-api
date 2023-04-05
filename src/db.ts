import mongoose from "mongoose"

export function connectDb(): Promise<typeof mongoose> {
    return mongoose.connect(process.env.host_db)
}