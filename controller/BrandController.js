const User=require("../models").user
const Category=require("../models").category
const SubCategory=require("../models").subcategory
const Brand=require("../models").brand



   
    //sub category

    getBrandPage=(req,res)=>{
        res.render("brand/brand")
    }

    brandData=async(req,res)=>{
        
       
        let data=await Brand.create({
            name: req.body.name,
            image: req.file.filename,
            status: req.body.status
        })
        res.redirect("/getShowBrand")
    }

    getShowBrand=async(req,res)=>{
     let brand=await   Brand.findAll({})
       res.render("brand/showBrand",{brand:brand})
    }

    updateBrand=async(req,res)=>{
       let brand=await Brand.findOne({where:{id:req.query.brandId}})
        res.render("brand/updateBrand",{brand:brand})
       
    }

    updateData=async(req,res)=>{
       await Brand.update({
            name: req.body.name,
            image:req?.file?.filename ||req.body.image,
            status: req.body.status
        },{where:{id:req.body.updateBrandId}})
        res.redirect("/getShowBrand")
    }

    deleteBrand=async(req,res)=>{
       await Brand.destroy({where:{id:req.query.brandId}})
       res.redirect("/getShowBrand")
    }

    brandStatus=async(req,res)=>{
        let change_status=""
    if(req.query.status=="active")
    {
        change_status=0
    }
    else{
        change_status=1
    }
   let data=await Brand.update({status:change_status},{where:{id:req.query.brandId}})
   res.redirect("/getShowBrand")
    }

module.exports={getBrandPage,brandData,getShowBrand,updateBrand,updateData,deleteBrand,brandStatus}