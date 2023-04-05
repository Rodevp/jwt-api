import { Request, Response } from "express"
import { createUser, getUserByEmail } from "../models/user"
import { auth, ramdonCryp } from  "../helpers/tools"

export const register = async (req: Request, res: Response) => {
    
    const { email, password, username } = req.body

    if (!email || !password || !username) {
        return res.status(400).json({ status: "failed", message: "Empty fields" })
    }

    const existingUser = await getUserByEmail(email)
    
    if (existingUser) {
        return res.status(400).json({ status: "failed", message: "User already exists" })
    }

    const salt = ramdonCryp()

    let user;

    try {

        user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: auth(salt, password),
            },
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "failed", message: "server internal error" })
    }

    return res.status(201).json({ status: "succes", message: "created", data: user })

}