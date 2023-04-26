const Contact = require("../models").contact
const fast2sms = require('fast-two-sms')
getShowContact = async (req, res) => {
  let allContact = await Contact.findAll({})
  res.render("contact/contact", { user: "", message: " ", allContact: allContact })

}
getFast2sms = (req, res) => {
  res.render("fast2fast/fast2fast", { user: " ", message: "" })
}

fast2fastSubmit = async (req, res) => {

  console.log("===========================================================", req.body)
  try {
    var options = { authorization: "C0FuPQ7Lklvi6B58dfnwoTxMt3hzmR4VySqpsr9aGIebWNYg1cl7YTzCDnvohQAWpPujdFgLBG642xb3", message: `${req.body.message}`, numbers: [`${req.body.phone}`] };
    smsSend(options);
  }
  catch (error) {
    console.log(error)
  }
}

async function smsSend(options){
  const response = await fast2sms.sendMessage(options)
  console.log(response)
}
module.exports = { getShowContact, getFast2sms, fast2fastSubmit }