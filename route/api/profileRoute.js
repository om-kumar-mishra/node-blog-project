const express=require("express")
const upload=require("../../utiles/multer_providetr")
const ApiProfile=express.Router()
//const ApiController=require("../controller/BlogController")
const ProfileController=require("../../controller/api/ProfileController")

ApiProfile.put("/profileUpdate",upload.single("image"),ProfileController.profileUpdate)
ApiProfile.get("/getProfile",ProfileController.getProfile)
ApiProfile.get("/forgetPassword",ProfileController.forgetPassword)
ApiProfile.post("/VerificationOtpForforgetPassword",ProfileController.VerificationOtpForforgetPassword)

ApiProfile.post("/changePassword",ProfileController.changePassword)





module.exports=ApiProfile