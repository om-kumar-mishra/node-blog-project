const User=require("../models").user
const Category=require("../models").category
const SubCategory=require("../models").subcategory

SubCategory.belongsTo(Category,{foreignKey:"categoryId",as:'Cat',})

   
    //sub category

    getSubCategorypage=async(req,res)=>{
        let category=await Category.findAll({})
        res.render("subCategory/subCategory",{category:category,message:""})
    }

    SubCategorySubmit=async(req,res)=>{
    let category=await Category.findAll({})
    let name=""
    let checkName=await Category.findOne({where:{ name:req.body.name}})
    if(checkName)
    {
       return res.send("name is already exist")
    }
    else{
        name=req.body.name
    }
    //
    let sequence=""
    let checkSequence=await Category.findOne({where:{ sequence:req.body.sequence}})
    if(checkSequence)
    {
        return res.send("sequence already exist")

    }
    else{
        sequence=req.body.sequence
    }
        let data=await SubCategory.create({
            name:name,
            sequence:sequence,
            image:req.files.image[0].filename,
            banner:req.files.banner[0].filename,
            categoryId:req.body.category,
            status:req.body.status
        })
    return   res.send("success")
    }
    getShowSubCategorypage=async(req,res)=>{
       let subcategory=await SubCategory.findAll({
        include: [{
            model: Category,
             as: 'Cat',
            attributes:['name']
           
              }
              
      
            ]
       })
        res.render("subCategory/showSubCategory",{user:"",subcategory:subcategory,message:""})
    }
    getSubCategoryUpdatePage=async(req,res)=>{
        let subcategory=await SubCategory.findOne({where:{id:req.query.subcategoryId}})
        let category=await Category.findAll({})
      res.render("subCategory/subCategoryUpdate",{subcategory:subcategory,category:category})
    }

    subcategoryUpdate=async(req,res)=>{
        console.log("sub category")
            let data =await SubCategory.update({
            name:req.body.name,
            sequence:req.body.sequence,
            image:(req?.files?.image)?req?.files?.image[0]?.filename:req.body.image,
            banner:(req?.files?.banner)?req?.files?.banner[0]?.filename:req.body.banner,
            categoryId:req.body.category,
            status:req.body.status
        },{where:{id:req.body.subcategoryId}})

   return    res.send(data)
    }

    deleteSubCategory=async(req,res)=>{
       
    let data=await SubCategory.destroy({where:{id:req.query.subcategoryId}})
    res.send("deleted")
    }

    SubCategoryStatus=async(req,res)=>{
        
     let sub=await   SubCategory.findOne({where:{id:req.query.subcategoryId}})
    
     if(sub.status==1)
       {
         change_status=0
       }
       else
       {
        change_status=1
       }
        
       let data=await SubCategory.update({status:change_status},{where:{id:req.query.subcategoryId}})
        res.send(data)
     
    }
module.exports={getSubCategorypage,SubCategorySubmit,getShowSubCategorypage,getSubCategoryUpdatePage,
    subcategoryUpdate,deleteSubCategory,SubCategoryStatus}
