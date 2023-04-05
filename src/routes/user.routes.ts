import { deleteUser, getAllUsers, updateUser } from "../controllers/user";
import { Router } from "express"


const router = Router()

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id', updateUser);

export default router