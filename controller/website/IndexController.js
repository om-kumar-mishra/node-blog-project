const User = require("../../models").user
const Category = require("../../models").category
const SubCategory = require("../../models").subcategory
const ChildCategory = require("../../models").chidcategory
const Product = require("../../models").product
const Blog = require("../../models").blog
const Trending = require("../../models").trending
const Cms = require("../../models").cms
const nodemailer = require("nodemailer");
const moment = require("moment");
const Setting = require("../../models").setting
const Likes = require("../../models").alllikes
const Unlikes = require("../../models").Unlikes
const Comments = require("../../models").comments
const userRegistration = require("../../models").user_registration
const Contact = require("../../models").contact
const sequelize = require("../../models").sequelize




const { Op } = require("sequelize");
Trending.belongsTo(Blog, { foreignKey: "blog", as: "BLOG" })
Blog.belongsTo(Category, { foreignKey: "category", as: "Cate" })
Comments.belongsTo(userRegistration, { foreignKey: "userId", as: "User" })

Blog.hasMany(Likes)
Likes.belongsTo(Blog, { foreignKey: "blogId", as: "like" })
// Category.hasMany(SubCategory)
// SubCategory.belongsTo(Category,{foreignKey:"categoryId",as:'findByCat',})

// getAllCategory=async()=>{
//     let category=await Category.findAll({})
//     return category
// }

getWebIndex = async (req, res) => {

    try {

        let cms = await Cms.findAll({});
        let trending = await Trending.findAll({
            attributes: {
                include: [
                    [
                        // Note the wrapping parentheses in the call below!
                        sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM alllikes
                       WHERE blogId=blog.id
                            
                    )`),
                        'laughReactionsCount'
                    ]
                    ,
                    [
                        // Note the wrapping parentheses in the call below!
                        sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM unlikes
                       WHERE blogId=blog.id
                            
                    )`),
                        'unlikeReactionsCount'
                    ]
                ]

            },
            include: [
                {
                    model: Blog,
                    as: 'BLOG',
                }
            ]
        });

        let setting = await Setting.findOne({});
        let twoCategory = await Category.findAll({ where: { id: { [Op.between]: [27, 28], } } });
        let threeCategory = await Category.findAll({ where: { id: { [Op.between]: [27, 29], } } });
        let threeSubCategory = await SubCategory.findAll({ where: { id: { [Op.between]: [10, 12], } } });
        let twoChildCategory = await ChildCategory.findAll({ where: { id: { [Op.between]: [1, 2], } } });
        let twoProduct = await Product.findAll({ where: { id: { [Op.between]: [15, 18], } } });

        let allChild = await ChildCategory.findAll({});
        let category = await Category.findAll({});
        let subcategory = await SubCategory.findAll({});
        let allProduct = await Product.findAll({});

        let blog = await Blog.findAll({
            attributes: {
                include: [
                    [
                        // Note the wrapping parentheses in the call below!
                        sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM alllikes
                       WHERE blogId=blog.id
                            
                    )`),
                        'laughReactionsCount'
                    ]
                    ,
                    [
                        // Note the wrapping parentheses in the call below!
                        sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM unlikes
                       WHERE blogId=blog.id
                            
                    )`),
                        'unlikeReactionsCount'
                    ]
                ]

            }


        });


        let fourBlog = await Blog.findAll({
            limit: 4
        });

         res.render("website/index.ejs", {
            fourBlog: fourBlog,
            threeCategory: threeCategory, twoCategory: twoCategory, blog: blog, category: category,
            subcategory: subcategory, allChild: allChild, allProduct: allProduct, threeSubCategory: threeSubCategory,
            twoChildCategory: twoChildCategory, twoProduct: twoProduct, trending: trending, cms: cms, setting: setting, login_user: req.session.newUser
        });
    }
    catch(error) {
        console.log(error.message);
        // res.redirect("back")
        res.send("main page is not working  =", error.message);
        
    }

}




getSubCategoryShow = async (req, res) => {
    let setting = await Setting.findOne({})
    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let category = await Category.findAll({})
    let subcategory = await SubCategory.findAll({})
    let findCategoryBy = await SubCategory.findAll({

        where: { categoryId: req.query.categoryId }

    })
    console.log("findCategoryBy=", findCategoryBy)
    res.render("website/showSubCategroybyCategory", {
        setting: setting, cms: cms, findCategoryBy: findCategoryBy, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })
}


getChildCategoryBySubCategory = async (req, res) => {
    let setting = await Setting.findOne({})
    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let category = await Category.findAll({})
    let subcategory = await SubCategory.findAll({})

    let childBySubCategory = await ChildCategory.findAll({ where: { subcategory: req.query.subcategoryId } })

    res.render("website/showChildCategory", {
        setting: setting, cms: cms, childBySubCategory: childBySubCategory, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })
}




showAllCategory = async (req, res) => {
    let setting = await Setting.findOne({})


    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})

    let category = await Category.findAll({})
    let findCategoryById = await Category.findOne({ where: { id: req.query.categoryId } })
    res.render("website/showAllCategory", {
        setting: setting, cms: cms, findCategoryById: findCategoryById, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })
}



showSubCategoryById = async (req, res) => {
    let setting = await Setting.findOne({})


    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})
    let subcategoryById = await SubCategory.findOne({ where: { id: req.query.subId } })
    res.render("website/showSubCategoryById", {
        setting: setting, cms: cms, subcategoryById: subcategoryById, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })
}



showChildById = async (req, res) => {
    let setting = await Setting.findOne({})



    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})
    let findChildById = await ChildCategory.findOne({ where: { id: req.query.childId } })
    res.render("website/showChildById", {
        setting: setting, cms: cms, findChildById: findChildById, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })
}




showProductById = async (req, res) => {
    let setting = await Setting.findOne({})


    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})
    let getProductById = await Product.findOne({ where: { id: req.query.productId } })
    res.render("website/showProductById", {
        setting: setting, cms: cms, getProductById: getProductById, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })
}



showAllCategoryNew = async (req, res) => {
    let setting = await Setting.findOne({})


    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})
    let allCategoryNew = await Category.findAll({})

    res.render("website/showAllCategoryNew", {
        setting: setting, cms: cms, allCategoryNew: allCategoryNew, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })

}

showAllProduct = async (req, res) => {
    let setting = await Setting.findOne({})


    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})
    let allCategoryNew = await Category.findAll({})
    let all_product = await Product.findAll({})

    res.render("website/getAllProduct", {
        setting: setting, cms: cms, all_product: all_product, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })

}



//blog by category

getBlogById = async (req, res) => {
    let setting = await Setting.findOne({})

    let page
    if (req.query.page) {
        page = req.query.page
    }
    const limit = 2;
    Blog.findAll({ limit })

    let cms = await Cms.findAll({})
    let allCategoryNew = await Category.findAll({})
    let all_product = await Product.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})
    let categoryById = await Category.findOne({ where: { name: req.query.blogId } })
    let categoryName = await Category.findOne({ where: { name: req.query.blogId } })

    let blogByCategoryId = await Blog.findAll({

        attributes: {
            include: [
                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM alllikes
                       WHERE blogId=blog.id
                            
                    )`),
                    'laughReactionsCount'
                ]
                ,
                [
                    // Note the wrapping parentheses in the call below!
                    sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM unlikes
                       WHERE blogId=blog.id
                            
                    )`),
                    'unlikeReactionsCount'
                ]
            ]

        },







        include: [
            {
                model: Category,
                as: 'Cate',


            }
        ],
        where: { category: categoryName.id }
    })
    res.render("website/blogByCategoryId", {
        setting: setting, categoryById: categoryById, cms: cms, blogByCategoryId: blogByCategoryId, all_product: all_product, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })

}




detailOfBlog = async (req, res) => {
    let setting = await Setting.findOne({})


    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})
    let blogbyId = await Blog.findOne({ where: { name: req.query.blogId } })
    res.render("website/blog_detail", {
        setting: setting, cms: cms, blogbyId: blogbyId, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })


}


//slug 
getSlugPage = async (req, res) => {
    let setting = await Setting.findOne({})


    let cms = await Cms.findAll({})

    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})
    let cmsFindBySlugName = await Cms.findOne({ where: { slugName: req.query.slug_name } })
    res.render("website/uniqueSlug", {
        setting: setting, cmsFindBySlugName: cmsFindBySlugName, cms: cms, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })

}

getContactPage = async (req, res) => {
    let setting = await Setting.findOne({})


    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})

    res.render("website/contact", {
        setting: setting, message: "", cms: cms, category: category, subcategory: subcategory, allChild: allChild,
        allProduct: allProduct, login_user: req.session.newUser
    })

}


//contact
contactSubmit = async (req, res) => {
    let setting = await Setting.findOne({})
    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})





    // console.log("name =",req.body.name)
    // let checkEmail= await Contact.findOne({where:{email:req.body.email}})

    //  if(checkEmail)
    //  {
    //     message="email is already exist"
    //     res.render("website/contact",{message:message,login_user: req.session.newUser,setting:setting,message:message,cms:cms,category:category,subcategory:subcategory,allChild:allChild,allProduct:allProduct})

    //  }

    let contact = await Contact.create({
        name: req.body.name,
        subject: req.body.subject,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })

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
        to: "omkumar.alobha@gmail.com", // list of receivers
        subject: "your data is succesfully added", // Subject line
        text: "name =" + contact.name + "  " + "subject =" + contact.subject + "   " + "email =" + contact.email + "   " + "pnone =" + contact.phone + "  " + "message =" + contact.message, // plain text body
        //html: "<b>Hello world?</b>", // html body
    };

    transporter.sendMail(info, (error, details) => {
        if (error) {
            let message = "Error"
            res.render("website/contact", { login_user: req.session.newUser, setting: setting, message: message, cms: cms, category: category, subcategory: subcategory, allChild: allChild, allProduct: allProduct })

        }
        else {
            let message = "sucessfull sent"
            res.render("website/contact", { login_user: req.session.newUser, setting: setting, message: message, cms: cms, category: category, subcategory: subcategory, allChild: allChild, allProduct: allProduct })
        }
    })
}


searchBlog = async (req, res) => {
    let setting = await Setting.findOne({})

    let blog
    let findByCategory
    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})



    findByCategory = await Category.findOne({
        where: {
            name:
                { [Op.like]: `%${req.body.search}%` }
        }
    })
    blog = await Blog.findAll({ where: { category: findByCategory.id } })


    res.render("website/blogSearchByName", { setting: setting, login_user: req.session.newUser, blog: blog, findByCategory: findByCategory, cms: cms, category: category, subcategory: subcategory, allChild: allChild, allProduct: allProduct })

}




paggination = async (req, res) => {
    console.log("==================", req.query.page)
    let setting = await Setting.findOne({})
    let findByCategory
    let cms = await Cms.findAll({})
    let allProduct = await Product.findAll({})
    let allChild = await ChildCategory.findAll({})
    let subcategory = await SubCategory.findAll({})
    let category = await Category.findAll({})

    let blog = await Blog.findAll({ limit: 2, offset: (req.query.page - 2) * 2 })
    console.log("===============", blog)
    res.render("website/paggination", { setting: setting, login_user: req.session.newUser, blog: blog, findByCategory: findByCategory, cms: cms, category: category, subcategory: subcategory, allChild: allChild, allProduct: allProduct })
}





getLike = async (req, res) => {

    console.log("===============================", req.body.blogId, req.body.userId)
    let checkLike = await Likes.findOne({ where: { blogId: req.body.blogId, blogId: req.body.blogId } })

    //same user like first after like again
    if (checkLike) {
        Likes.destroy({ where: { id: checkLike.id } })
    }
    else {
        //check user post unlike
        let checkUnlike = await Unlikes.findOne({ where: { userId: req.body.userId, blogId: req.body.blogId } })
        if (checkUnlike) {
            await Unlikes.destroy({ where: { id: checkUnlike.id } })
        }

        await Likes.create({
            userId: req.body.userId,
            blogId: req.body.blogId

        })
    }

    let allLikes = await Likes.findAll({
        where: { blogId: req.body.blogId }
    })

    allLikes.forEach((likes, index) => {
        index = index + 1
        console.log("like==", index)
        like = index
    })

    console.log("allLikes =" + allLikes)
    console.log("like==", like)


    res.send({ like: like })

}




getUnLike = async (req, res) => {

    let checkUnlike = await Unlikes.findOne({ where: { blogId: req.body.blogId, userId: req.body.userId } })
    if (checkUnlike) {
        Unlikes.destroy({ where: { id: checkUnlike.id } })
    }
    else {
        let checkLike = await Likes.findOne({ where: { blogId: req.body.blogId, userId: req.body.userId } })

        if (checkLike) {
            Likes.destroy({ where: { id: checkLike.id } })
        }

        Unlikes.create({
            userId: req.body.userId,
            blogId: req.body.blogId
        })
    }

    let blogUnlike = await Unlikes.findAll({ where: { blogId: req.body.blogId } })
    let unlike
    blogUnlike.forEach((e, index) => {
        index = index + 1
        unlike = index
    })
    res.send({ unlike: unlike })
}




let comment_blogId
getComments = async (req, res) => {
    comment_blogId = req.body.blogId
    await Comments.create({
        userId: req.body.userId,
        blogId: req.body.blogId,
        description: req.body.comment
    })

    let blogComment = await Comments.findAll({ where: { blogId: req.body.blogId } })

    res.send({ blogComment: blogComment })

}

showComments = async (req, res) => {

    let blog_name = await Blog.findOne({ where: { id: comment_blogId } })
    let blogComment = await Comments.findAll({
        include: [
            {
                model: userRegistration,
                as: "User"

            }
        ],
        where: { blogId: comment_blogId }
    })

    res.render("website/comment", { blogComment: blogComment, blog_name: blog_name })
}

deleteComment = async (req, res) => {
    console.log("delete======================")
    await Comments.destroy({ where: { id: req.query.commentId } })
    res.redirect("/showComments")
}

// getdemo = (req, res) => {
//     res.render("demo")
// }

module.exports = {
    getWebIndex, getSubCategoryShow, getChildCategoryBySubCategory, showAllCategory,
    showSubCategoryById, showChildById, showProductById, showAllCategoryNew,
    showAllProduct, getBlogById, detailOfBlog, getSlugPage, getContactPage, contactSubmit, searchBlog, paggination,
    getLike, getUnLike, getComments, showComments, deleteComment
}