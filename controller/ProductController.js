const User=require("../models").user
const Category=require("../models").category
const SubCategory=require("../models").subcategory
const ChildCategory=require("../models").chidcategory
const Brand=require("../models").brand
const Product=require("../models").product

Product.belongsTo(Category,{foreignKey:"category" , as:"Cat"})
Product.belongsTo(SubCategory,{foreignKey:"subcategory",as:"Sub"})
Product.belongsTo(ChildCategory,{foreignKey:"childcategory",as:"Child"})
Product.belongsTo(Brand,{foreignKey:"brand",as:"Brand"})


getProductPage=async(req,res)=>{
 
  let category= await Category.findAll({})
  let subcategory= await SubCategory.findAll({})
  let childCategory= await ChildCategory.findAll({})
  let brand= await Brand.findAll({})

    res.render("products/product",{category:category,subcategory:subcategory,childCategory:childCategory,brand:brand})
}

productSubmit=async(req,res)=>{
  console.log("file =",req.file)
    


 await Product.create({
  title: req.body.title,
  sku: req.body.sku,
  modelName: req.body.modelName,
  category: req.body.category,
  subcategory: req.body.subcategory,
  childcategory: req.body.childcategory,
  brand: req.body.brand,
  gst: req.body.gst,
  summary: req.body.summary,
  description: req.body.description,
  exchangeday: req.body.exchangeday,
  returnDay: req.body.returnDay,
  paymentMode: req.body.paymentMode,
  price: req.body.price,
  discount: req.body.discount,
  sellingPrice: req.body.sellingPrice,
  image: req.file.filename,
  status: req.body.status
  })
  res.redirect("/getShowProduct")
}

getUpdatePage=async(req,res)=>{
  let category= await Category.findAll({})
  let subcategory= await SubCategory.findAll({})
  let childCategory= await ChildCategory.findAll({})
  let brand= await Brand.findAll({})
 
 let product= await Product.findOne({where:{id:req.query.productId}})
  res.render("products/updateProduct",{product:product,category:category,subcategory:subcategory,childCategory:childCategory,brand:brand})
}

getShowProduct=async(req,res)=>{
 let product=await Product.findAll({
    include:[
      {
        model:Category,
        as:"Cat"
      }
      ,
      {
        model:SubCategory,
        as:"Sub"
      },
      {
        model:ChildCategory,
        as:"Child"
      },
      {
        model:Brand,
        as:"Brand"
      }
      
    ]
    
 })
  res.render("products/showProduct",{product:product,user:""})
}


productDataUpdata=async(req,res)=>{
  console.log("update data")
   console.log("id",req.body.productId)
   await Product.update({

      title: req.body.title,
      sku: req.body.sku,
      modelName: req.body.modelName,
      category: req.body.category,
      subcategory: req.body.subcategory,
      childcategory: req.body.childcategory,
      brand: req.body.brand,
      gst: req.body.gst,
      summary:req.body.summery,
      description: req.body.description,
      exchangeday: req.body.exchange_day,
      returnDay: req.body.returnDay,
      paymentMode: req.body.paymentMode,
      price: req.body.price,
      discount: req.body.discount,
      sellingPrice: req.body.sellingPrice,
      image:req?.file?.filname|| req.body.image,
      status: req.body.status

    },{where:{id:req.body.productId}})
    res.redirect("/getShowProduct")
   
    
}

deleteProduct=async(req,res)=>{
   await  Product.destroy({where:{id:req.query.productId}})
   req.toastr.success('Successfully deleted');

   res.redirect("/getShowProduct")
}


productStatus=async(req,res)=>{
  let checkStatus= await Product.findOne({where:{id:req.query.productId}})
  let changeStatus
  if(checkStatus.status==1)
  {
    req.toastr.success('Inactive !');
    checkStatus=0;
  }
  else{
    req.toastr.success('Active!');
    checkStatus=1;
  }
    await Product.update({status:checkStatus},{where:{id:req.query.productId}})
   res.redirect("/getShowProduct")
    
}

module.exports={getUpdatePage,getProductPage,getShowProduct,productSubmit,productDataUpdata,deleteProduct,productStatus}