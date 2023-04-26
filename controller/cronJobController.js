const cron = require("node-cron");
const nodemailer = require("nodemailer");
// cron.schedule("*/10 * * * * *", function() {
//     console.log("running a task every 10 second seferter");
// });


// cron.schedule("5-10 * * * * *", function() {
//     console.log("running a task every 5-10 second seferter");
// });


// cron.schedule("5,10,15 * * * * *", function() {
//     console.log("running a task every 5-10 second seferter");
// });




// cron.schedule("5,10,15 * * * * *", function() {
//     console.log("running a task every 5-10 second seferter");
    
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: "omkrmishra123@gmail.com", // generated ethereal user
    //       pass:process.env.emailAppPassword, // generated ethereal password
    //     },
    //   });


      
    // let info = {
    //     from: "omkrmishra123@gmail.com", // sender address
    //     to: ["kaustubhtrivedi12@gmail.com","omkumar.alobha@gmail.com","rohan@gmail.com"], // list of receivers
    //     subject: "hello " , // Subject line
    //     text: "your name is  k ",
    //     html: "<b>Hello world?</b>", // html body
    //   };


    //   transporter.sendMail(info, (error, details) => {
    //     if (error) {
    //       let message = "Error"
    //       res.render("website/userModule/login", { user: "", message: "user is not register" })
  
    //     }
    //     else {
    //       let message = "sucessfull sent"
    //       res.render("website/userModule/login", { user: "", message: message })
  
    //     }
    //   })
  
// });



// cron.schedule("5,10,15 * * * * *", function() {
//     console.log("running a task every 5-10 second seferter");
// });