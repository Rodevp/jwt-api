import { Request, Response } from 'express';

import { deleteUserById, getUsers, getUserById } from '../models/user';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers()

        return res.status(200).json({ status: "succes", message: "user all", data: users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "succes", message: "server internal error" })
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    try {

        await deleteUserById(id)

        return res.status(200).json({ status: "succes", message: "user delete" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "succes", message: "server internal error" })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { username } = req.body

    if (!username) {
        return res.sendStatus(400)
    }

    try {
        const user = await getUserById(id);

        user.username = username;
        await user.save()

        return res.status(200).json({ status: "succes", message: "user update" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "succes", message: "server internal error" })
    }
}