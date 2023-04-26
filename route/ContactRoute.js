const express=require("express")
const upload=require("../utiles/multer_providetr")
const ContactRouter=express.Router()
const ContactController=require("../controller/ContactController")

ContactRouter.get("/getShowContact",ContactController.getShowContact)
ContactRouter.get("/getFast2sms",ContactController.getFast2sms)
ContactRouter.post("/fast2fastSubmit",ContactController.fast2fastSubmit)



module.exports=ContactRouter