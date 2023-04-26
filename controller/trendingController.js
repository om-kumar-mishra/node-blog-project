const User=require("../models").user
const Category=require("../models").category
const SubCategory=require("../models").subcategory
const Trending=require("../models").trending
const Blog=require("../models").blog

Trending.belongsTo(Category,{foreignKey:"category",as:"Cat"})

getTreandingPage=async(req,res)=>{
    let category=await Category.findAll({})
    req.body.category
   req.body.category
   res.render("trending_now/trending_now",{user:"",category:category})
}

trendingSubmit=async(req,res)=>{

    
    let category=await Category.findAll({})
      let data= await Trending.create({
        category:req.body.category,
        status: req.body.status,
        blog: req.body.blog
    })
    if(data)
   { 
    res.render("trending_now/trending_now",{user:"",category:category,message:"data added"})
   }
   {
    res.render("trending_now/trending_now",{user:"",category:category,message:"error"})
   }
}

getShowTrendingPage=async(req,res)=>{
 let trending= await  Trending.findAll({
    include:[
        {
            model: Category,
             as: 'Cat',
           
           
     }
    ]
 })
   res.render("trending_now/showTrending",{trending:trending,user:""})
}

getUpdateTrendingPage=async(req,res)=>{
 let trendingUpdate= await  Trending.findAll({where:{id:req.query.trendingId}})
 let category=await Category.findAll({})

    res.render("trending_now/updateTrending",{trendingUpdate:trendingUpdate,user:"",category:category})
}

trendingUpdateData=async(req,res)=>{
     let updateTrenidng=await  Trending.update({
        category:req.body.category,
        status: req.body.status
       },{where:{id:req.body.trendingId}})
       res.redirect("/getShowTrendingPage")
}

deleteTrending=async(req,res)=>{
  let deleteTrending=await  Trending.destroy({where:{id:req.query.trendingId}})
  res.redirect("/getShowTrendingPage")
}

updateTrendingStatus=async(req,res)=>{
 let checkStatus=await Trending.findOne({where:{id:req.query.trendingId}})
 let change_status   
 if(checkStatus.status==1)
    {
        change_status=0
    }
    else{
        change_status=1
    }
    let status =await Trending.update({status:change_status},{where:{id:req.query.trendingId}})
    res.redirect("/getShowTrendingPage")
}

getBlogsByCategoryId=async(req,res)=>{
   let data= await Blog.findAll({where:{category:req.query.categoryId}})
 return  res.send(data)
}

module.exports={getTreandingPage,trendingSubmit,getShowTrendingPage,getUpdateTrendingPage,
    trendingUpdateData,deleteTrending,updateTrendingStatus,showAllCategoryNew,
    showAllCategoryNew,getBlogsByCategoryId}