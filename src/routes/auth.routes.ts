import { login, register } from "../controllers/auth"
import { Router } from "express"


const router = Router()

router.post('/singin', register)
router.post('/login', login)


export default router