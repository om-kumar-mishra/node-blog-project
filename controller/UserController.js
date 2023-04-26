const User=require("../models").user
const Category=require("../models").category
const SubCategory=require("../models").subcategory
getloginpage=(req,res)=>{

   res.render("login",{message:" "})
  
}

getUserRegistration=(req,res)=>{
    res.render("register")
}

usersubmit=async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    
 let data=  await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        image:req.file.filename
    })

    res.redirect("/")
}
loginsubmit=async(req,res)=>{
   let data=await User.findOne({
        where:{
            
            email: req.body.email,
            password:req.body.password
        }
    })
    
        if(data){
            req.session.loggedin = true;
            req.session.user = data
            //console.log(path.join(__dirname, 'views',"index")) 
            res.redirect("/getAdminPage")
           }
           else{
            res.render("login",{message:"invalid user "})
           }
    }

    logout=(req,res)=>{
        req.session.destroy()
        res.redirect("/getloginpage")
    }

    updateprofile=(req,res)=>{
        console.log("update profile",req.body,req.file)
    
        // console.log("update profile",req.file.filename,req.body.userId)
        User.update(
            {
            image:(req?.file)?req.file.filename:req.body.old_image
        }
        ,{where:{id:req.body.userId}})
        res.redirect("/")
    }

    forgetPassowrd=async(req,res)=>{
      
       let data=await User.update({
            password: req?.body?.password 
        },{where:{email:req?.body?.email}})
        if(data)
        {
           return res.render("login",{message:"success"})
        }
        else
        {
           return res.render("login",{message:"fail"})
        }
        
       

    }

    getAdminPage=(req,res)=>{
      console.log("req.session.user =",req.session.user)
        res.render("index",{user:req.session.user})
    }
     
    privacy_policy=(req,res)=>{
        res.render("policy",{user:""})
    }
    

    module.exports={getloginpage,getUserRegistration,usersubmit,loginsubmit,logout,
                    updateprofile,forgetPassowrd,getAdminPage,privacy_policy}