import { createUser, findAll } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { defaultAvatar } from "../constants.js";


const registerUser = asyncHandler(async(req,res)=>{
    const {username,fullName,email,password} = req.body

    if([username,fullName,password,email].some((field )=> field.trim() === "")){
        throw new ApiError(404,"All fields are required",)
    }

    // const existedUser = await findOne(email,username) //implement logic to check email or username is already used

    //hahsing password
    const hashedPassword = await bcryptjs.hash(password,10)

    //file uploading feature
    const avatarLocalPath = req.file?.path
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    
    const user = await createUser({
        username,
        email,
        fullName,
        password:hashedPassword,
        avatar:avatar?avatar.url:defaultAvatar
    })

    if(!user){
        throw new ApiError(500,"Unable to create a new user")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(201,{username,fullName,email,password},"user registration successfull")
            )
})

const getAllUsers = asyncHandler(async(req,res)=>{

    const users = await findAll()
    return res
            .status(201)
            .json(
                new ApiResponse(201,users,"Fetched all users")
            )
})


export {
    registerUser,
    getAllUsers
}