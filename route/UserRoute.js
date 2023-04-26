const express=require("express")
const upload=require("../utiles/multer_providetr")
const UserRouter=express.Router()
const UserController=require("../controller/UserController")
const authMiddlware=require("../middleware/auth")
UserRouter.get("/getloginpage",UserController.getloginpage)
UserRouter.get("/getUserRegistration",UserController.getUserRegistration)
UserRouter.post("/usersubmit",upload.single("image"),UserController.usersubmit)
UserRouter.post("/loginsubmit",upload.none(),UserController.loginsubmit)
UserRouter.get("/logout",UserController.logout)
UserRouter.post("/updateprofile",upload.single("image"),UserController.updateprofile)
UserRouter.post("/forgetPassowrd",upload.none(),UserController.forgetPassowrd)
UserRouter.get("/getAdminPage",authMiddlware.login,UserController.getAdminPage)
UserRouter.get("/privacy_policy",authMiddlware.login,UserController.privacy_policy)


module.exports=UserRouter