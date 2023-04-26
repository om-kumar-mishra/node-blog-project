const jsonTokenKey=require("../utiles/JsonKeyToken")
const jwt= require('jsonwebtoken');
login=(req,res,next)=>{
    if(req.session.user)
    {
        //res.render("index",{user:req.session.user})
        next()
    }
    else
    {
       return res.redirect("/getloginpage")
    }
   
}

jwt_login=(req,res,next)=>{
    
 console.log("============================")
//  const token = req.header('authorization');
  
        
    try {
        
        const token = req.header('x-auth-token');
       
         console.log("token ==",token)
         
        const verified = jwt.verify(token,process.env.Token_SecretKey);
        console.log("verified",verified)
        if(verified){
            
            next()
        }else{
            return res.redirect("/getUserModuleLoginPage")
            // Access Denied
          //  return res.status(401).json({code:400,message:"invalid token"});
        }
    } catch (error) {
        // Access Denied
        //return res.redirect("/getUserModuleLoginPage")

        return res.status(401).json({code:401,message:"error ",error:error});
    }



    //       console.log(req.body.Authorization)
    //    if(req.body.Authorization)
    //    {
    //       next()
    //    }
    //    else
    //    {
        
    //     return res.redirect("/getUserModuleLoginPage")

    //    }
}

module.exports={login,jwt_login}