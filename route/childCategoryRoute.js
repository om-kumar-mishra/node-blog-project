const express=require("express")
const upload=require("../utiles/multer_providetr")
const ChildCategoryRouter=express.Router()
const ChildCategoryController=require("../controller/ChildController")

ChildCategoryRouter.get("/getChidCategory",ChildCategoryController.getChidCategory)

ChildCategoryRouter.post("/ChildCategory",upload.single("image"),ChildCategoryController.ChildCategorySubmit)
ChildCategoryRouter.get("/getshowchildcategory",ChildCategoryController.getshowchildcategory)
ChildCategoryRouter.get("/getChildCategoryUpdatePage",ChildCategoryController.getChildCategoryUpdatePage)
ChildCategoryRouter.post("/updateChildData",upload.single("image"),ChildCategoryController.updateData)
ChildCategoryRouter.get("/deleteChildCategory",ChildCategoryController.deleteChildCategory)
ChildCategoryRouter.get("/childStatus",ChildCategoryController.childStatus)
module.exports=ChildCategoryRouter