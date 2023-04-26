const express=require("express")
const upload=require("../utiles/multer_providetr")
const BrandRouter=express.Router()
const BrandController=require("../controller/BrandController")







//sub category
BrandRouter.get("/getBrandPage",BrandController.getBrandPage)
BrandRouter.get("/getShowBrand",BrandController.getShowBrand)
BrandRouter.post("/brandData",upload.single("image"),BrandController.brandData)
BrandRouter.get("/updateBrand",BrandController.updateBrand)
BrandRouter.post("/updateData",upload.single("image"),BrandController.updateData)
BrandRouter.get("/deleteBrand",BrandController.deleteBrand)
BrandRouter.get("/brandStatus",BrandController.brandStatus)

brandStatus
deleteBrand
updateData
/updateBrand
module.exports=BrandRouter