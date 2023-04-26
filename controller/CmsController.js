const { Sequelize, Op, Model } = require('sequelize');
//const { Op } = require("sequelize");
//let swal = require("sweetalert")
//let swal = require("../public/js/sweetalert")
const Cms = require("../models").cms
var faker = require('faker');
 const   faker_2=        require("../models").faker_2
const fakertable = require("../models").fakertable

getCms = (req, res) => {
    res.render("cms/cms", { user: "",message:" " })
}

cmsSubmit = async (req, res) => {
  

    let checkTitle = await Cms.findOne({ where: { title: req.body.title } })

    let slugName
    let title
    if (checkTitle) {
       
      return  res.render("cms/cms", {message:"title is already exist", user: "" })
    }
    else {

        title = req.body.title
        slugName = title.replaceAll(" ", "_")
    }

   let data= await Cms.create({
        title: title,
        slugName: slugName.toLowerCase(),
        discription: req.body.description,
        image: req.file.filename,
        satus: req.body.status
    })
    // if(data)
    // {
    //     res.render("cms/cms", {message:"success", user: "" })
    // }

    res.redirect("/showCms")
}

showCms = async (req, res) => {
    let cms = await Cms.findAll({})
    res.render("cms/showCms", { user: "", cms: cms })
}

getUpdateCms = async (req, res) => {

    let cms = await Cms.findOne({ where: { id: req.query.cmsId } })
    res.render("cms/updateCms", { cms: cms, user: "", message:"" })
}

cmsUpdate = async (req, res) => {
    

    let checkTitle = await Cms.findOne({ where: { title: req.body.title, id:{[Op.not]: req.body.cmsId } } })
    let update
    let slugName
    let title
    if (checkTitle) {

        let cms = await Cms.findOne({ where: {id:req.body.cmsId} })
       return     res.render("cms/updateCms", { cms: cms, user: "" ,message:"name is already exist"})
      

    }
    else {

        title = req.body.title
        //slugName = title.replaceAll(" ", "_")
    }
    title = req.body.title
    update = await Cms.update({
        title: title,
        slugName:  req.body.slugName ,
        discription: req.body.description,
        image: (req.file) ? req.file.filename : req.body.image,
        satus: req.body.status

    }, { where: { id:req.body.cmsId} })

    let cms = await Cms.findOne({ where: {id:req.body.cmsId} })
    return     res.render("cms/updateCms", { cms: cms, user: "" ,message:"success"})
   


}

deleteCms=async(req,res)=>{
let cmsDelete=    await Cms.destroy({where:{id:req.query.cmsId}})
return  res.redirect("/showCms")
}


fakerData=(req,res)=>{
    console.log("===============================================================================")
  for(let i=0; i<=1000; i++){
    let data=  fakertable.create({
      firstName:faker.name.firstName(),
      lastName:  faker.name.lastName()
    })
  }

}
 oneLakhData=async(req,res)=>{
    for(let i=0; i<=100000; i++)
    {
    await  faker_2.create({
        name: faker.name.firstName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email()
      })
    }
    res.send("completed")
  }


 fakerPaggination_2=async(req,res)=>{
  
 //let list=await faker_2.findAll({})
 let list
 let searchData

 var perPage = 10
 var page = req.query.page || 1
 let increment=((perPage * page) - perPage) 
const count = await faker_2.count();
console.log("=======================",req.query.searchData.searchName)
if(req.body.searchByName||req.query.searchData?.searchName)
{
  let data={
    searchName:req.body.searchByName
  }
  searchData=data
   list = await faker_2.findAll({limit: perPage, offset:((perPage * page) - perPage) ,
    where:{name:{[Op.like]: `%${req.body.searchByName||req.query.searchData.searchName}%`}}})
    
}
else if(req.body.searchByEmail)
{
  //searchData=req.body.searchByEmail
  let data={
    searchEmail:req.body.searchByEmail
  }
  searchData.push(data)
  list = await faker_2.findAll({limit: perPage, offset:((perPage * page) - perPage) ,
    where:{email:{[Op.like]: `%${req.body.searchByEmail}%`}}})
}
else if(req.body.searchByPhone)
{
  searchData=req.body.searchByPhone

  list = await faker_2.findAll({limit: perPage, offset:((perPage * page) - perPage) ,
    where:{phone:{[Op.like]: `%${req.body.searchByPhone}%`}}}) 
}
else {
   list = await faker_2.findAll({limit: perPage, offset:((perPage * page) - perPage) })
}

console.log("===",searchData)
// console.log(req.body.searchByName)
console.log("=======================",req.query.searchData)
//console.log("arrrrrrrrrr===",req.query.searchData[0])
 res.render("faker/faker_2", { user: "" ,list:list ,current: page,all:count, pages:Math.ceil(count / perPage),searchData:searchData,increment:increment}) 
     
  }
  
    // let firstName = faker.name.firstName()
    // let lastName = faker.name.lastName()
    // console.log(firstName)
    // console.log(lastName)
  // res.send(data)
  

  
  // fakerList=async(req,res)=>{
  // let list =await  fakertable.findAll({})
  // res.render("faker/list", { user: "", list:list })
  
  
  // }
  

  fakerPaggination=async(req,res)=>{ 
    
  // let listAndCount = await  fakertable.findAndCountAll({row:true,limit: 10, offset: (req.query.page - 1) * 10 })
  // let list = await  fakertable.findAll({ })


    var perPage = 10
    var page = req.query.page || 1


  const count = await fakertable.count();
  console.log("=======================",)
   const list = await fakertable.findAll({limit: perPage, offset:((perPage * page) - perPage)})
 
  
  res.render("faker/list", { user: "" ,list:list,current: page, pages:Math.ceil(count / perPage) }) 

  }


//  serachByName=async(req,res)=>{
//   req.body.searchByName
//  let searchByName = await faker_2.findAll({where:{name: { [Op.like]: `%${req.body.searchByName.trim()}%` }}})
//  console.log("=============================",searchByName)
//  res.render("faker/faker_2", { user: "" ,list:searchByName ,current: 0, pages:0}) 
//   }


  serachByEmail=async(req,res)=>{
    let searchByEmail = await faker_2.findAll({where:{email: { [Op.like]: `%${req.body.searchByEmail.trim()}%` }}})
    
    res.render("faker/faker_2", { user: "" ,list:searchByEmail ,current: 0, pages:0}) 
  }


  serachByPhone=async(req,res)=>{
    let searchByPhone = await faker_2.findAll({where:{phone: { [Op.like]: `%${req.body.searchByPhone.trim()}%` }}})
    
    res.render("faker/faker_2", { user: "" ,list:searchByPhone ,current: 0, pages:0}) 
  }
module.exports = { getCms, cmsSubmit, showCms, getUpdateCms, cmsUpdate,deleteCms,fakerData,fakerPaggination ,oneLakhData,fakerPaggination_2,
  serachByEmail,serachByPhone}