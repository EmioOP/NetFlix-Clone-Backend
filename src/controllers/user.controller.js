import { createUser, findAll } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";



const registerUser = asyncHandler(async(req,res)=>{
    const {username,fullName,email,password,avatar} = req.body

    const defaultAvatar = 'https://m.gettywallpapers.com/wp-content/uploads/2023/09/Pfp-Hachiman-Hikigaya.jpg'


    if([username,fullName,password,email].some((field)=> field.trim() === "")){
        throw new ApiError(404,"All fields are required",)
    }

    // const existedUser = await findOne(email,username) //implement logic to check email or username is already used

    const hashedPassword = await bcryptjs.hash(password,10)

    const user = await createUser({
        username,
        email,
        fullName,
        password:hashedPassword,
        avatar:avatar?avatar:defaultAvatar
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