import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { checkIsLikedVideo, getByIdAndAddLike, getByIdAndRemoveLike } from "../model/like.models.js";


const toggleVideoLike = asyncHandler(async(req,res)=>{
    //take the video id from the url parameters

    const {id} = req.params // video id

    console.log(id)

    if(!id){
        throw new ApiError(401,"not a valid video id found")
    }

    const isLiked = await checkIsLikedVideo({
        videoId:id,
        userId:req.user?.id
    })


    if(isLiked){
        console.log("here")
        const removeLike = await getByIdAndRemoveLike({
            videoId:id,
            userId:req.user.id
            })
        if(!removeLike){
            throw new ApiError(500,"Unable to remove like")
        }

        return res  
                .status(201)
                .json(
                    new ApiResponse(201,{},"Video Like Removed")
                )
    }

    const addLike = await getByIdAndAddLike({
        videoId:id,
        userId:req.user?.id
    })

    if(!addLike){
        throw new ApiError(500,"Unable like the video")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(201,{},"Like added to the video")
            )

})


export {
    toggleVideoLike
}