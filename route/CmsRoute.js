const express=require("express")
const upload=require("../utiles/multer_providetr")
const CmsRouter=express.Router()
const CmsController=require("../controller/CmsController")
const cronJobController=require("../controller/cronJobController")

CmsRouter.get("/getCms",CmsController.getCms)
CmsRouter.post("/cmsSubmit",upload.single("image"),CmsController.cmsSubmit)
CmsRouter.get("/showCms",CmsController.showCms)
CmsRouter.get("/getUpdateCms",CmsController.getUpdateCms)
CmsRouter.post("/cmsUpdate",upload.single("image"),CmsController.cmsUpdate)
CmsRouter.get("/deleteCms",CmsController.deleteCms)
CmsRouter.get("/facker-data",CmsController.fakerData)

//CmsRouter.get("/faker-list",CmsController.fakerList)
CmsRouter.get("/add-one-lakh-data",CmsController.oneLakhData)
CmsRouter.post("/search-by-name",CmsController.fakerPaggination_2)
CmsRouter.post("/search-by-email",CmsController.fakerPaggination_2)
CmsRouter.post("/search-by-phone",CmsController.fakerPaggination_2)




CmsRouter.get("/faker-list",CmsController.fakerPaggination)
CmsRouter.get("/faker-list-2",CmsController.fakerPaggination_2)


//cron job start
//CmsRouter.get("/faker-list-2",CmsController.fakerPaggination_2)
//cron jon end
module.exports=CmsRouter