const express=require("express")
const upload=require("../../utiles/multer_providetr")
const BlogRouter=express.Router()
//const ApiController=require("../controller/BlogController")
const BlogController=require("../../controller/api/BlogController")
//const userApiController=require("../../controller/api/userApiController")

const apiMiddleware=require("../../middleware/auth")
       
BlogRouter.get("/blogList",apiMiddleware.jwt_login,BlogController.blogList)
BlogRouter.get("/getBlogById",apiMiddleware.jwt_login,BlogController.getBlogById)
BlogRouter.put("/getBlogUpdate",upload.single("image"),apiMiddleware.jwt_login,BlogController.getBlogUpdate)
BlogRouter.post("/blogSearchByBlogName",apiMiddleware.jwt_login,BlogController.blogSearchByBlogName)
BlogRouter.post("/blogSearchByCategory",apiMiddleware.jwt_login,BlogController.blogSearchByCategory)
BlogRouter.get("/getBlogByPaggination",apiMiddleware.jwt_login,BlogController.getBlogByPaggination)
BlogRouter.post("/getBlogBySummery",apiMiddleware.jwt_login,BlogController.getBlogBySummery)
BlogRouter.get("/exportFileInExcel",BlogController.exportFileInExcel)

//user api


module.exports=BlogRouter