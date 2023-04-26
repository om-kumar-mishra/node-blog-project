const express=require("express")
//const upload=require("../utiles/multer_providetr")
const ApiRouter=express.Router()
//const ApiController=require("../controller/BlogController")
const ApiController=require("../../controller/api/LoginController")
const apiMiddleware=require("../../middleware/auth")

ApiRouter.post("/getSignup",ApiController.getSignup)
ApiRouter.post("/getVerfiyOtp",ApiController.getVerfiyCode)



module.exports=ApiRouter