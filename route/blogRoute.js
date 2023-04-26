const express=require("express")
const upload=require("../utiles/multer_providetr")
const BlogRouter=express.Router()
const BlogController=require("../controller/BlogController")
 

BlogRouter.get("/getBlogPage",BlogController.getBlogPage)
BlogRouter.post("/blogSubmit",upload.single("image"),BlogController.blogSubmit)
BlogRouter.get("/getShowBlog",BlogController.getShowBlog)
BlogRouter.get("/getUpdateBlog",BlogController.getUpdateBlog)
BlogRouter.post("/blogUpdateData",upload.single("image"),BlogController.blogUpdateData)
BlogRouter.get("/deleteBlog",BlogController.deleteBlog)
BlogRouter.get("/blogStatus",BlogController.blogStatus)
BlogRouter.get("/importExcelBlog",BlogController.importExcelBlog)


deleteBlog
blogUpdateData

getUpdateBlog


module.exports=BlogRouter