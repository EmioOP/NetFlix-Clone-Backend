import { Router } from "express";
import { validateJWT } from "../middlewares/auth.middleware.js";
import { createComment, getAllComments } from "../controllers/comment.controllers.js";



const router = Router()


router.route("/comment/:id").post(validateJWT,createComment)
router.route("/:id").get(getAllComments)


export default router