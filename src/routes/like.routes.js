import { Router } from "express";
import { validateJWT } from "../middlewares/auth.middleware.js";
import { getLikes, toggleVideoLike } from "../controllers/like.controllers.js";

const router = Router()


router.route("/like/:id").post(validateJWT,toggleVideoLike)
router.route("/:id").get(getLikes)


export default router