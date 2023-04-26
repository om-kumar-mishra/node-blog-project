
const userRegistration = require("../../models").user_registration
const fakertable = require("../../models").fakertable


const { check, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const validator = require('validator');


getUserModuleRegistrationPage = (req, res) => {
  req.flash('success',"test message")
  // console.log(req.flash('success')[0])
  res.render("website/userModule/registration", { user: "", message: "" })
}

userRegistrationDataSubmit = async (req, res) => {

      if(!validator.isAlpha(req.body.name)&&validator.isEmpty(req.body.name))
      {
        req.flash('error','name must not be empty and name must be albha value')
        return res.render("website/userModule/registration", { user: "", message:''  })
      }

      if(validator.isEmail(req.body.email)!=true)
       {
        req.flash('error','invalid email must be include @gmail.com')
        return res.render("website/userModule/registration", { user: "", message:''  })

       }

    

     if(validator.isEmpty(req.body.password))
     {
      req.flash('error','password must   not be empty')
      return res.render("website/userModule/registration", { user: "", message: ''  })
      
     }

     if(validator.isMobilePhone(req.body.mobile)==false&&validator.isNumeric(req.body.mobile)==false)
      {
      req.flash('error','number must be numeric and must be 10 digits')
      return res.render("website/userModule/registration", { user: "", message: ''  })

     }
    
    //  if(validator.isEmpty(req.file.image))
    //  {
    //   req.flash('error','image must not be empty')
    //   return res.render("website/userModule/registration", { user: "", message: ''  })
    //  }
    
   
  

  // If no error occurs, then this
  // block of code will run
  

    let x = Math.floor((Math.random() * 10000) + 1);
    let data = await userRegistration.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      image: (req.file)?req.file.filename:"",

      status: 0,
      activationCode: x
    })


    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "omkrmishra123@gmail.com", // generated ethereal user
        pass:process.env.emailAppPassword, // generated ethereal password
      },
    });

    let info = {
      from: "omkrmishra123@gmail.com", // sender address
      to: `${req.body.email}`, // list of receivers
      subject: "hello " + req.body.name, // Subject line
      text: "your name is =" + req.body.name + "   " +
        "your phone number is =" + req.body.mobile + "  " +

        "your  email     OTP =" + x,
      //html: "<b>Hello world?</b>", // html body
    };


    transporter.sendMail(info, (error, details) => {
      if (error) {
        let message = "Error"
        res.render("website/userModule/login", { user: "", message: "user is not register" })

      }
      else {
        let message = "sucessfull sent"
        res.render("website/userModule/login", { user: "", message: message })

      }
    })

    res.render("website/userModule/registration", { user: "", message: "Successfully" })
  }


getUserModuleLoginPage = (req, res) => {
  //req.flash('success','testing toast')
  res.render("website/userModule/login", { user: "", message: "" })
}


UserLoginSubmit = async (req, res) => {

  let loginData = await userRegistration.findOne({
    where: {

      email: req.body.email,
      password: req.body.password
    }
  })

  if (loginData) {
    if (loginData.status == 1) {
      //login direct if status is active
      if (loginData) {
        req.session.loggedin = true;
        req.session.newUser = loginData
        req.flash('success','login successful')
        res.redirect("/web")
      }
      else {
        req.flash('error','invalid user')
        res.render("websitde/userModule/login", { user: "", message: "invalid user" })
      }
    }
    else {

      res.render("website/userModule/otpVarificationPage", { message: "", email: loginData.email })
    }
  }
  else {
    res.render("website/userModule/login", { user: "", message: "invalid user" })

  }

}

forgetUserPassowrd = async (req, res) => {

  let data = await userRegistration.update({
    password: req?.body?.password
  }, { where: { email: req?.body?.email } })
  if (data) {
    return res.render("website/userModule/login", { message: "success" })
  }
  else {
    return res.render("website/userModule/login", { message: "fail" })
  }



}

UserLogeOut = async (req, res) => {
  // await userRegistration.update({status:0},{where:{id:loginData.id}})
console.log("=========================================================== logout")
  req.session.destroy()
  res.redirect("/web")
}

otpVarificaion = (req, res) => {
  res.render("website/userModule/otpVarificationPage", { message: "", email: " " })
}

otpVarifictionSubmit = async (req, res) => {
  let loginData = await userRegistration.findOne({ where: { email: req.body.email } })
  console.log("loginData  =", loginData)
  console.log("loginData  =", loginData.activationCode)


  if (loginData.activationCode == req.body.otp) {

    await userRegistration.update({ status: 1 }, { where: { id: loginData.id } })
    req.session.newUser = loginData
    res.redirect("/")
  }
  else {
    return res.render("website/userModule/login", { message: "invalid OTP" })
  }
}


module.exports = {
  getUserModuleRegistrationPage, userRegistrationDataSubmit, getUserModuleLoginPage,
  UserLoginSubmit, forgetUserPassowrd, UserLogeOut, otpVarificaion, otpVarifictionSubmit,
}