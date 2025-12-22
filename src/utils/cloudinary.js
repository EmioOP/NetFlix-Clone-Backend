import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        const response = cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        return response
    } catch (error) {
        console.log(error.message || "something went wrong while uploading file..")
    }
}


export {uploadOnCloudinary}