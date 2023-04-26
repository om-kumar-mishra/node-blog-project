
const Profile = require("../../models").profile
const { check, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const jwt= require('jsonwebtoken');
const jsonTokenKey=require("../../utiles/JsonKeyToken")
//const nodemailer = require("nodemailer");

getSignup=async(req,res)=>{
    console.log(req.body)
    console.log(req.body.email)
    console.log(req.body.mobile)
    try
    {
      
      let checkUser=await   Profile.findOne({where:{email:req.body.email}})
      if(checkUser)
      {
      return  res.status(404).json({message:"you are already exist",code:404})
      }


      else{

      

        // otp gennerate

        let  otp = Math.floor(1000 + Math.random() * 9000);

        let data=await  Profile.create({
            
             email: req.body.email,
            // mobile: req.body.phone,
             activationCode:otp,
            
        })   

        //send otp in email

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "omkrmishra123@gmail.com", // generated ethereal user
            pass: "czfwskiguvrwciuq", // generated ethereal password
          },
        });
    
        let info = {
          from: "omkrmishra123@gmail.com", // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "otp verification" +req.body.email, // Subject line
          text:"your  email     OTP =" + otp,
          //html: "<b>Hello world?</b>", // html body
        };
    
    
        transporter.sendMail(info, (error, details) => {
          if (error) {
            res.json({code:401,message:"Error in sending in email",error:error})
           
    
          }
          else {
            
            res.json({code:200,message:"sucessfull sent"})
    
          }
        })
        
        res.status(200).json({message:"successfull",code:200,data:data})

      }
    
}
catch(error)
{
    res.status(400).json({data:error,code:300})
}

}

getVerfiyCode=async(req,res)=>{
    try{
        

        let data= await Profile.findOne({
            where:{email:req.body.email,activationCode:req.body.otp}
        })
       
        if(data)
        {
          const token=  jwt.sign({userObj:data},jsonTokenKey)
          console.log(token)
          res.status(200).json({message:"verified your number " ,code:200,data:data,token:token})
        }
        else
        {
          res.status(200).json({message:"invalid",code:400})

        }
       
        
    }
    catch(error)
    {
        res.status(400).json({message:"exception",code:400,error:error})
    }
   
}




module.exports={getSignup,getVerfiyCode}