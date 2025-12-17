import {app} from "./app.js"

// import dotenv from 'dotenv'
// dotenv.config() //now dotenv packege is not important just give in the package file

app.listen(process.env.PORT,()=>{
    console.log("Server running or port: ",process.env.PORT)
})