const User=require("../models").user
const Category=require("../models").category
const SubCategory=require("../models").subcategory

//category
 getCategory=(req,res)=>{
    res.render("category/category",{check:"",message:""})
}


CategorySubmit=async(req,res)=>{
 console.log("files =",req.files)

let name=""
   let checkName=await Category.findOne({where:{name:req.body.name}})
    if(checkName)
    {
        return   res.send("name is already exist")
    }
    else{name=req.body.name}

//check sequence
let seq=""
    let checkSeq=await Category.findOne({where:{sequence:req.body.sequence}})
    if(checkSeq)
    {
     return   res.send("sequence is already exist")
    }
    else{seq=req.body.sequence}

  let data=  await Category.create({
        name:name,
        sequence:seq,
        image:req.files?.image[0].filename,
        banner:req.files?.banner[0].filename,
        status:req.body.status
           });
           
        //    res.redirect("/getShowCategory")
        return res.send("success")
}



getShowCategory=async(req,res)=>{
    let category=await Category.findAll({})
    let user=""
    res.render("category/showcategory",{user:"",category:category,message:""})
}

updateCategory=async(req,res)=>{
 let categoryUpdate= await Category.findOne({where:{id:req.query.categoryId}})
    res.render("category/categoryUpdate",{categoryUpdate:categoryUpdate})
}

CategoryUpdate=async(req,res)=>{
    //console.log(req.files)

    let image
    if(req?.files?.image)
    {
       image= req?.files?.image[0]?.filename

    }
    else{
        image=req.body.old_image
    }
 console.log(req?.files?.image)
  let data= await Category.update({
        name:req.body.name,
        sequence:req.body.sequence,
        // image:(req?.files?.image[0]?.filename || req.body.old_image),
         image:image,
         banner:(req?.files?.banner)?req.files.banner[0].filename:req.body.old_banner,
        status:req.body.status
    },{
        where:{id:req.body.categoryId}
    })
    res.send(data)
   //res.redirect("/getShowCategory")
}

CategoryStatus=async(req,res)=>{
    let change_status=""
    let Cat=await   Category.findOne({where:{id:req.query.categoryId}})
    
     if(Cat.status==1)
       {
        req.toastr.success('Inactive.');

         change_status=0
       }
       else
       {
        req.toastr.success('Inactive.');
        change_status=1
       }
   let data=await Category.update({status:change_status},{where:{id:req.query.categoryId}})
 
 res.send(data)
}

deleteCategory=async(req,res)=>{
 let data= await  Category.destroy({where:{id:req.query.categoryId}})

 res.send("deleted");

}

module.exports={getCategory,
    CategorySubmit,getShowCategory, updateCategory,CategoryUpdate,deleteCategory,CategoryStatus}