import { Router } from "express";
import { validateJWT } from "../middlewares/auth.middleware.js";
import {
    addVideoToPlayList,
    createPlayList,
    getPlaylistVideos,
    removeVideoFromPlaylist
} from "../controllers/playlist.controllers.js";


const router = Router()

router.route("/")
    .post(validateJWT, createPlayList)

router.route("/:playlistId/video/:videoId")
            .post(validateJWT, addVideoToPlayList)
            .delete(validateJWT,removeVideoFromPlaylist)

router.route("/:playlistId").get(getPlaylistVideos)

export default router