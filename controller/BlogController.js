const User=require("../models").user
const Category=require("../models").category
const SubCategory=require("../models").subcategory
const Brand=require("../models").brand
const Blog=require("../models").blog
const { col } = require("sequelize")
const reader = require('xlsx')

Blog.belongsTo(Category,{foreignKey:"category",as:"cate"})

getBlogPage=async(req,res)=>{
    let category=await Category.findAll({})
    res.render("blog/blog",{user:"",category:category})
}

blogSubmit=async(req,res)=>{

   let blog=await Blog.create({
        name: req.body.name,
        description: req.body.description,
        image: req.file.filename,
        status: req.body.status,
        summery: req.body.summery,
        category: req.body.category
    })
    res.redirect("/getShowBlog")

}


getShowBlog=async(req,res)=>{
   let blog=await Blog.findAll({
    include:[
        {
            model:Category,
            as:"cate"
        }
    ]
   })
    res.render("blog/showBlog",{blog:blog,user:""})
}

getUpdateBlog=async(req,res)=>{
    let category=await Category.findAll({})

  let blogById=await  Blog.findOne({where:{id:req.query.blogId}})
   res.render("blog/updateBlog",{blogById:blogById,user:"",category:category})
}

blogUpdateData=async(req,res)=>{
    console.log("blog update data")
    console.log("req.body.name",req.body.name)
    console.log("blog update data", req.body.description)
    console.log("blog update data",  req.body.status)
    console.log("blog update data", req.body.blogId)



 let updateBlog=await  Blog.update({
    name: req.body.name,
    description: req.body.description,
    image: req.file?.filename||req.body.image,
    status: req.body.status,
    summery: req.body.summery,
    category: req.body.category
   },{where:{id:req.body.blogId}})
   res.redirect("/getShowBlog")
}

deleteBlog=async(req,res)=>{
let deleteBlog= await Blog.destroy({where:{id:req.query.blogId}})
res.redirect("/getShowBlog")
}

blogStatus=async(req,res)=>
{
   let blogById=await   Blog.findOne({where:{id:req.query.blogId}})
   let status_change
    if(blogById.status==1)
    {
        status_change=0
    }
    else{
        status_change=1
    }
    let updateStatus=await   Blog.update({ status:status_change},{where:{id:req.query.blogId}})
    res.redirect("/getShowBlog")
}

importExcelBlog=(req,res)=>{

const file = reader.readFile('./blogUsers.xlsx')
let data = [] 
const sheets = file.SheetNames 
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((re) => {
      data.push(re)
   })
} 
// Printing data
console.log(data)

}

module.exports={getBlogPage,blogSubmit,getShowBlog,getUpdateBlog,blogUpdateData,deleteBlog,
    blogStatus,importExcelBlog}