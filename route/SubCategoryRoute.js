const express=require("express")
const upload=require("../utiles/multer_providetr")
const SubCategoryRouter=express.Router()
const SubCategoryController=require("../controller/SubCategoryController")







//sub category
SubCategoryRouter.get("/getSubCategorypage",SubCategoryController.getSubCategorypage)
SubCategoryRouter.get("/getShowSubCategorypage",SubCategoryController.getShowSubCategorypage)
const cpUpload =upload.fields([{ name: 'image', maxCount: 1 }, { name:'banner', maxCount: 8 }])
SubCategoryRouter.post("/SubCategorySubmit",cpUpload,SubCategoryController.SubCategorySubmit)
SubCategoryRouter.get("/getSubCategoryUpdatePage",SubCategoryController.getSubCategoryUpdatePage)
SubCategoryRouter.post("/subcategoryUpdate",cpUpload,SubCategoryController.subcategoryUpdate)
SubCategoryRouter.get("/deleteSubCategory",SubCategoryController.deleteSubCategory)
SubCategoryRouter.get("/SubCategoryStatus",SubCategoryController.SubCategoryStatus)

module.exports=SubCategoryRouter