import {Router} from 'express'
import { getAllUsers, registerUser } from '../controllers/user.controller.js'


const router = Router()


router.route("/register",).post(registerUser)
router.route("/",).get(getAllUsers)

export default router