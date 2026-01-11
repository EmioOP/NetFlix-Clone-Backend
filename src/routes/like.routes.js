import { Router } from "express";
import { validateJWT } from "../middlewares/auth.middleware.js";
import { toggleVideoLike } from "../controllers/like.controllers.js";

const router = Router()


router.route("/like/:id").post(validateJWT,toggleVideoLike)


export default router