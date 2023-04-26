const { setting } = require("../models")
const  path=require("path")
const fs = require('fs');

const Setting=require("../models").setting
getSettingPage=async(req,res)=>{
    let  settingData=await  Setting.findOne({})
    console.log("===========================",settingData)
  res.render("setting/setting",{user:"",settingData:settingData})
   
}


settingSubmit=async(req,res)=>{
    console.log("======================================================")
    let  data=await  Setting.findOne({})
    if (data==null)
    {
  await  Setting.create({
    logoUpload:req.files?.logoUpload[0].filename,
    febIcon:req.files?.febIcon[0].filename,
    email: req.body.email,
    phone: req.body.phone,
    address:req.body.address,
    facebook:req.body.facebook,
    instagram:req.body.instagram,
    twitter: req.body.twitter,
    driven:req.body.driven
    })
  }
  else{
    let logo
    if(req.files?.logoUpload)
    {
     // await  fs.unlinkSync(path.join(__dirname,"..","public","userimage",`${req.body.updatelogoUpload}`))
        logo=req.files?.logoUpload[0].filename
    }
    else
    {
      logo=req.body.updatelogoUpload
    }
    console.log(req.body.updatelogoUpload)
         console.log("_dirname ========================================="+path.join(__dirname,"..","public","userimage",`${req.body.updatelogoUpload}`))
    
    // await  fs.unlinkSync("../public/userimage/"+req.files?.febIcon[0].filename)
  
    Setting.update({
    logoUpload:logo,
    febIcon:(req.files?.febIcon)?req.files?.febIcon[0].filename:req.body.febIcon,
    email: req.body.email,
    phone: req.body.phone,
    address:req.body.address,
    facebook:req.body.facebook,
    instagram:req.body.instagram,
    twitter: req.body.twitter,
    driven:req.body.driven
    },{where:{id:req.body.adminSettingId}})
  }
  
 let  settingData=await  Setting.findOne({})
      
    res.render("setting/setting",{user:"",settingData:settingData})
}
module.exports={getSettingPage,settingSubmit}