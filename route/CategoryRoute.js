const express=require("express")
const upload=require("../utiles/multer_providetr")
const CategoryRouter=express.Router()
const CategoryController=require("../controller/CategoryController")


//category
CategoryRouter.get("/getCategory",CategoryController.getCategory)
CategoryRouter.get("/getShowCategory",CategoryController.getShowCategory)
const cpUpload =upload.fields([{ name: 'image', maxCount: 1 }, { name:'banner', maxCount: 8 }])
CategoryRouter.post("/CategorySubmit",cpUpload,CategoryController.CategorySubmit)
CategoryRouter.get("/updateCategory",CategoryController.updateCategory)
 
CategoryRouter.post("/CategoryUpdate",cpUpload,CategoryController.CategoryUpdate)
CategoryRouter.get("/deleteCategory",CategoryController.deleteCategory)
CategoryRouter.get("/CategoryStatus",CategoryController.CategoryStatus)
module.exports=CategoryRouter