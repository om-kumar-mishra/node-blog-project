const express=require("express")
const {body ,validationResult} =require("express-validator")
const upload=require("../../utiles/multer_providetr")
const Api=express.Router()
//const ApiController=require("../controller/BlogController")
const UserApiController=require("../../controller/api/UserApiController")

const agoraApiController=require("../../controller/agoraApiController")
const compressImageController=require("../../controller/compressImageController")
//import compressImageController from "../../controller/compressImageController.mjs";
//const userApiController=require("../../controller/api/userApiController")

//const apiMiddleware=require("../../middleware/auth")
       


//user api
Api.post("/user-add",upload.single("image"),[
    body("name","name should have at least two char").isLength({min:2}),
    body("email","mail must include '@gmail.com' ").isEmail(),
    body("age","age should not be empty").exists(),
    body("password").isLength({min:5})
],UserApiController.addUser)


Api.get("/users",UserApiController.getAll)
Api.delete("/user-delete",UserApiController.deleteUser)
Api.get("/single-user",UserApiController.singleUser)

Api.put("/user-update",upload.single("image"),UserApiController.updateUser)
Api.post("/login",UserApiController.Login)

Api.post("/generate-token",upload.none(),UserApiController.generateToken)


//agora api
Api.get("/whiteboard",whiteBoard=(req,res)=>{
    res.render("agoraWhiteBoard", { user:" ",message:" " })
   
})
// Api.post('/whiteboard/join',agoraApiController.agoraWhiteBoardjoin)
// Api.get('/whiteboard/Whitejoin',agoraApiController.joinWhiteBorad)


/// compress image
Api.get("/compress-image",compressImageController.getImagecompressImage)
Api.post("/compress-image-post",upload.single("image"),compressImageController.compressImage)
 
module.exports=Api