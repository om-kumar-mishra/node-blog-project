const express=require("express")
const upload=require("../../utiles/multer_providetr")
const UserModuleRouter=express.Router()
const { check, validationResult } = require('express-validator');
const UserModuleController=require("../../controller/website/UserModuleController")




UserModuleRouter.get("/getUserModuleRegistrationPage",UserModuleController.getUserModuleRegistrationPage)

UserModuleRouter.post("/userRegistrationDataSubmit",upload.single("image"),UserModuleController.userRegistrationDataSubmit)





UserModuleRouter.get("/getUserModuleLoginPage",UserModuleController.getUserModuleLoginPage)
UserModuleRouter.post("/UserLoginSubmit",UserModuleController.UserLoginSubmit)
UserModuleRouter.post("/forgetUserPassowrd",UserModuleController.forgetUserPassowrd)
UserModuleRouter.get("/UserLogeOut",UserModuleController.UserLogeOut)
UserModuleRouter.get("/otpVarificaion",UserModuleController.otpVarificaion)
UserModuleRouter.post("/otpVarifictionSubmit",UserModuleController.otpVarifictionSubmit)





module.exports=UserModuleRouter