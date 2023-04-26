const express=require("express")
const upload=require("../utiles/multer_providetr")
const SettingRoute=express.Router()
const SettingController=require("../controller/SettingController")

SettingRoute.get("/getSettingPage",SettingController.getSettingPage)
const cpUpload =upload.fields([{ name:'logoUpload', maxCount: 1 }, { name:'febIcon', maxCount: 8 }])
SettingRoute.post("/settingSubmit",cpUpload,SettingController.settingSubmit)
settingSubmit
module.exports=SettingRoute