const Profile = require("../../models").profile
const { check, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const jwt= require('jsonwebtoken');
const jsonTokenKey=require("../../utiles/JsonKeyToken")
const excelJS = require("exceljs");


profileUpdate=async(req,res)=>{
    console.log("==================================")
    console.log("req.file.filename =",req.file)
    console.log("email =",req.body.email)

    try{


      
        if(req.body.mobile.length!==10)
        {
          return  res.status(400).json({message:"phone nubmer should be 10 digits",code:404})

        }

 let profile=await Profile.findOne({where:{email:req.body.email}})
 console.log("profile =",profile)
 console.log("req.file.filename =",req.file.filename)
 console.log(req.body.name)
  let update=await  Profile.update({
      image:(req.file!=null)?req.file.filename:profile.image,
      name:(req.body.name)?req.body.name:profile.name,
      gender:(req.body.gender)?req.body.gender:profile.gender,      
      profession:(req.body.profession)?req.body.profession:profile.profession,
      dateOfBirth:(req.body.dateOfBirth)?req.body.dateOfBirth:profile.dateOfBirth,
      email:(req.body.email)?req.body.email:profile.email,
      mobile:(req.body.mobile)?req.body.mobile:profile.mobile,     
      password:(req.body.password)?req.body.password:profile.password
    },{where:{email:req.body.email}})


    let updatedProfile=await Profile.findOne({where:{email:req.body.email}})
    res.status(200).json({messsage:"sucessfull",code:200,update:updatedProfile})
}
catch(error)
{
    res.status(400).json({message:"error in code ",code:400,data:error.message})
}
}




getProfile=async(req,res)=>{
    console.log("===================================================")
    try{
      const token = req.header('x-auth-token')
      const verified = jwt.verify(token,"vusfdwsgchsdhcsdhcdsnsdvhcscmsnvdjbslsdnjsdvchdsdvchjsd");
      console.log("verified =",verified)
       let data =await  Profile.findOne({where:{id:verified.userObj.id}})
        res.status(200).json({code:200,message:"profile data",code:200,data:data})
    }
    catch(error)
    {
        res.status(400).json({message:"error in code", code:400,data:error})
    }
 }
 



 forgetPassword=async(req,res)=>{
  console.log("email =",req.body.email)
    console.log("================================")
   try{
    let data =await  Profile.findOne({where:{email:req.body.email}})
    
        // otp gennerate

        let  otp = Math.floor(1000 + Math.random() * 9000);


    console.log("data  =",data)
    if(data!=null)
    {
      //update otp
      Profile.update({
        activationCode:otp
      },{where:{id:data.id}})

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: `${req.body.email}`, // generated ethereal user
          pass: "czfwskiguvrwciuq", // generated ethereal password
        },
      });
  
      let info = {
        from: "omkrmishra123@gmail.com", // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "hello " +req.body.email, // Subject line
        text:"your  email     OTP =" + otp,
        //html: "<b>Hello world?</b>", // html body
      };
  
  
      transporter.sendMail(info, (error, details) => {
        if (error) {
          res.json({code:401,message:"Error in sending in email",error:error})
         
  
        }
        else {
          
          res.json({code:200,message:"otp sent your email",OTP:otp})
  
        }
      })
      
    }
   }
   catch(error)
   {
     res.json({code:400,message:"error in code",})
   }

 }

 VerificationOtpForforgetPassword=async(req,res)=>{

     try{
       let profile=await Profile.findOne({where:{email:req.body.email}})
       if(profile!=null)
       {
           if(profile.activationCode==req.body.otp)
           {
             profile.update({password:req.body.password},{where:{id:profile.id}})
             res.json({code:200,messgae:"your password is updated"})
           }
           else{
            res.json({code:300,messgae:"invalid otp"})
             
           }
       }
       else{
        res.json({code:401,message:"email is not found"})
       }
     }
     catch(error){
      res.json({code:401,message:"error in code"})

     }
     
 }


 changePassword=async(req,res)=>{
  try{
  
    const token = req.header('x-auth-token')
    const verified = jwt.verify(token,"vusfdwsgchsdhcsdhcdsnsdvhcscmsnvdjbslsdnjsdvchdsdvchjsd");
    let profile=await Profile.findOne({where:{id:verified.userObj.id}})
    console.log("verified =",verified)
      console.log("email =",verified.userObj.email==req.body.email)
      console.log("password =",profile.password==req.body.oldPassword)
      
      
      if(verified!=null){
    if(verified.userObj.email==req.body.email&&profile.password==req.body.oldPassword)
       {
           Profile.update({
             password:req.body.newPassword
           },{where:{id:verified.userObj.id}})

          let update=await Profile.findOne({where:{id:profile.id}})
           res.json({code:200,message:"your password change",data:update})
       }
       else{
        res.json({code:402,message:'invalid user'})
       }
  }

else{
   res.json({code:400,message:"you are not login"})
}
}


  catch(error)
  {
    res.json({code:400,message:'error in code',error:error.message})
     
  }
 
}






module.exports={profileUpdate,getProfile,forgetPassword,VerificationOtpForforgetPassword,changePassword}