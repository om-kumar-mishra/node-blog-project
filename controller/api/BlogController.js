
const Blog = require("../../models").blog
const { check, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const jsonTokenKey = require("../../utiles/JsonKeyToken")
const { Op } = require("sequelize");
const excelJS = require("exceljs")

blogList = async (req, res) => {
    try {
        let data = await Blog.findAll({})
        res.status(200).json({ message: "all blog list", code: 200, data: data })
    }
    catch (error) {
        res.status(400).json({ message: "error in code", code: 400, data: error })
    }

}

getBlogById = async (req, res) => {
    try {
        let data = await Blog.findOne({ where: { id: req.body.id } })
        res.status(200).json({ messge: "search blog by id", code: 200, data: data })
    }
    catch (error) {
        res.status.json({ message: "error in code", code: 400, data: error })
    }

}

getBlogUpdate = async (req, res) => {
    try {

        let blog = Blog.findOne({ where: { id: req.body.id } })
        let data = await Blog.update({
            name: (req.body.name) ? req.body.name : blog.name,
            description: (req.body.description) ? req.body.description : blog.description,
            image: (req.file) ? req.file.filename : blog.image,
            status: (req.body.status) ? req.body.status : blog.status,
            summery: (req.body.summery) ? req.body.summery : blog.status,
            category: (req.body.category) ? req.body.category : blog.category,
        }, { where: { id: req.body.id } })

        if (data) {
            let blog = await Blog.findOne({ where: { id: req.body.id } })
            res.json({ code: 200, message: "successful update", updateData: blog })
        }
        else {

            res.json({ message: "not update", code: 400, data: data })

        }

    }
    catch
    {

    }

}

blogSearchByBlogName = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.body.bogName)
        let data = await Blog.findOne({ where: { name: req.body.bogName } })
        console.log(data)
        if (data) {
            res.status(200).json({ code: 200, message: "successful", data: data })
        }
        else {
            res.status(400).json({ code: 400, message: " blog name not found" })
        }

    }
    catch (error) {
        res.status(400).json({ code: 400, message: " Error in code", error: error })

    }


}

blogSearchByCategory = async (req, res) => {
    try {
        let blog = await Blog.findAll({ where: { category: req.body.categoryId } })
        if (blog) {
            return res.json({ code: 200, message: "get blog by category", data: blog })

        }
        else {
            return res.json({ code: 400, message: "category not found" })

        }

    }
    catch (error) {
        return res.json({ code: 400, message: "error in code", data: blog })

    }

}

getBlogByPaggination = async (req, res) => {
    try {
        let blog = await Blog.findAll({ limit: 2, offset: (req.query.page - 1) * 2 })
        console.log(blog)
        if (blog.length > 0) {

            res.json({ count: blog.length, code: 200, message: " two blog", data: blog })
        }
        else {
            res.json({ code: 400, message: "not found page" })
        }
    }
    catch (error) {
        res.json({ code: 400, message: "error in code" })
    }


}

getBlogBySummery = async (req, res) => {
    try {
        let blog = await Blog.findOne({ where: { summery: { [Op.like]: `%${req.body.summery}%` } } })
        console.log(blog)
        if (blog) {
            res.json({ code: 200, message: "blog by summery", data: blog })
        }
        else {
            res.json({ code: 400, message: "not found" })
        }
    }
    catch (error) {
        res.json({ code: 400, message: "error in code" })
    }
}

exportFileInExcel = async (req, res) => {
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
    const path = "./files";  // Path to download excel
    // Column for data in excel. key must match data key
    
    worksheet.columns = [
        { header: "S no.", key: "s_no", width: 10 },
        { header: "blog name", key: "bname", width: 10 },
        { header: "description", key: "description", width: 10 },
        { header: "image", key: "image", width: 10 },
        { header: "status", key: "status", width: 10 },
    ];

    let counter = 1;
    let blog = await Blog.findAll({})

    blog.forEach((b) => {
        b.s_no = counter;
        worksheet.addRow(b); // Add data in worksheet
        counter++;
    });

    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });



    try {

        const data = await workbook.xlsx.writeFile(`${path}/users.xlsx`)
            .then(() => {
                res.send({
                    status: "success",
                    message: "file successfully downloaded",
                    path: `${path}/users.xlsx`,
                });
            });

    }
    catch (err) {
        res.send({
            status: "error",
            message: "Something went wrong",
        });
    }

}










////user api



module.exports = {
    blogList, getBlogById, getBlogUpdate, blogSearchByBlogName, blogSearchByCategory,
    getBlogByPaggination, getBlogBySummery, exportFileInExcel
}