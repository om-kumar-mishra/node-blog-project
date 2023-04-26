
const User=require("../models").user
const Category=require("../models").category
const SubCategory=require("../models").subcategory
const ChildCategory=require("../models").chidcategory
 
ChildCategory.belongsTo(Category,{foreignKey:"category",as:"Cat"})
ChildCategory.belongsTo(SubCategory,{foreignKey:"subcategory",as:"Sub"})

getChidCategory=async(req,res)=>{
  let category= await Category.findAll({})
  let subcategory= await SubCategory.findAll({})
    res.render("childcategory/childcategory",{category:category,subcategory:subcategory})
}

ChildCategorySubmit=async(req,res)=>{
  let checkName=ChildCategory.findOne({where:{name:req.body.name}})
  let name;
    if(checkName)
    {
      res.send("name is already exist")
    }
    else{
      name:req.body.name
    }

    //check sequence
    let checkSeq=ChildCategory.findOne({where:{sequence:req.body.sequence}})
    let sequence;
      if(checkSeq)
      {
        res.send("sequence is already exist")
      }
      else{
        sequence:req.body.sequence
      }

let data =await   ChildCategory.create({
        name:name,
        sequence:sequence,
        image:req.file.filename,
        category:req.body.category,
        subcategory: req.body.subcategory,
        status:req.body.status

    })
    
     res.send("success")
}



getshowchildcategory=async(req,res)=>{
   let childCategory=await ChildCategory.findAll({
    
    include: [{
      model: Category,
       as: 'Cat',
      attributes:['name']
     
        },
        {
          model: SubCategory,
          as: 'Sub',
           attributes:['name']
         
            }

      ]

   })
   res.render("childcategory/showChildSubCategory",{childCategory:childCategory,user:""})
}




getChildCategoryUpdatePage=async(req,res)=>{
  let category= await Category.findAll({})
  let subcategory= await SubCategory.findAll({})
  let childCategory=await ChildCategory.findOne({where:{id:req.query.childCategoryId}})
  res.render("childcategory/ChildUpdate",{childCategory:childCategory,category:category,subcategory:subcategory})
}

updateData=async(req,res)=>{
  console.log("req.body.childCategoryId=",req.body.childCategoryId)
  let data=await ChildCategory.update({
    name:req.body.name,
    sequence:req.body.sequence,
    image:(req?.file)?req.file.filename:req.body.image,
    category:req.body.category,
    subcategory: req.body.subcategory,
    status:req.body.status

  },{where:{id:req.body.childCategoryId}})
  res.send(data)
}
deleteChildCategory=async(req,res)=>{
  await ChildCategory.destroy({where:{id:req.query.childCategoryId}})
  res.send("deleted")
  
}

childStatus=async(req,res)=>{
  let change_status=""
 let childCategory= ChildCategory.findOne({where:{id:req.query.childCategoryId}})
     if(childCategory.status==1)
      {
     change_status=0
     }
    else{
      change_status=1
     }
 
       
     
        let data=await ChildCategory.update({status:change_status},{where:{id:req.query.childCategoryId}})
        res.send("updated")
      }


module.exports={getChidCategory,ChildCategorySubmit,getshowchildcategory,getChildCategoryUpdatePage,
  updateData,deleteChildCategory,childStatus}