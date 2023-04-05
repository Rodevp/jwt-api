import { Request, Response } from "express"
import { createUser, getUserByEmail } from "../models/user"
import { auth, ramdonCryp } from "../helpers/tools"

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

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({ status: "failed", message: "Email or Password empty" })

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

    if (!user)
        return res.status(400).json({ status: "failed", message: "User no extisting" })


    const expectedHash = auth(user?.auth.salt, password);

    if (user?.auth.password != expectedHash)
        return res.status(403).json({ status: "failed", message: "Credentials invalid" })

    const salt = ramdonCryp();
    
    user.auth.sessionToken = auth(salt, user._id.toString())


    try {
        await user.save()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "failed", message: "Server internal error" })
    }

    res.cookie('AUTH-ID', user?.auth.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json({ status: "succes", message: "created", data: user })

}