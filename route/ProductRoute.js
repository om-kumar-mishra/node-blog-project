const express=require("express")
const upload=require("../utiles/multer_providetr")
const ProductRouter=express.Router()
const ProductController=require("../controller/ProductController")


ProductRouter.get("/getProductPage",ProductController.getProductPage)
ProductRouter.post("/productSubmit",upload.single("image"),ProductController.productSubmit)

//ProductRouter.post("/productDataSubmit",upload.single("image"),ProductController.productDataSubmit)
ProductRouter.get("/getShowProduct",ProductController.getShowProduct)
ProductRouter.get("/getUpdatePage",ProductController.getUpdatePage)
ProductRouter.get("/deleteProduct",ProductController.deleteProduct)
ProductRouter.get("/productStatus",ProductController.productStatus)

ProductRouter.post("/productDataUpdata",upload.single("image"),ProductController.productDataUpdata)

module.exports=ProductRouter