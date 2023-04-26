const express=require("express")
const upload=require("../utiles/multer_providetr")
const TrendingRouter=express.Router()
const TrendingController=require("../controller/trendingController")
 
TrendingRouter.get("/getTreandingPage",TrendingController.getTreandingPage)
TrendingRouter.post("/trendingSubmit",TrendingController.trendingSubmit)
TrendingRouter.get("/getShowTrendingPage",TrendingController.getShowTrendingPage)
TrendingRouter.get("/getUpdateTrendingPage",TrendingController.getUpdateTrendingPage)
TrendingRouter.post("/trendingUpdateData",TrendingController.trendingUpdateData)
TrendingRouter.get("/deleteTrending",TrendingController.deleteTrending)
TrendingRouter.get("/updateTrendingStatus",TrendingController.updateTrendingStatus)
TrendingRouter.get("/getBlogsByCategoryId",TrendingController.getBlogsByCategoryId)




module.exports=TrendingRouter