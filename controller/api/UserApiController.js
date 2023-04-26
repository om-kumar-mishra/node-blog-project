const user_api = require("../../models").user_api
const { body, validationResult } = require('express-validator');
const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require('agora-access-token')
addUser = (req, res) => {
   

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        errors.errors.forEach((error)=>{
            console.log(error.param);
            if (error.param == "name") {
                return res.status(400).json({ message:error.msg });
            }else if(error.param == "email"){
                return res.status(400).json({ message:error.msg });
            }
            else{
                return res.status(400).json({ errors: errors.array() });
            }
        })
        

            
        

    }
    else {
        user_api.create({

            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password,
            image: `/userimage/${req.file.filename}`

        }).then((data) => {

            res.status(200).json({ message: "successfully added", code: 200, data: data })

        })
    }

}




getAll = async (req, res) => {
    await user_api.findAll({}).then((data) => {
        res.status(200).json({ message: "successfully get all data", code: 200, data: data })
    })
}

deleteUser = (req, res) => {
    console.log("delete==========")
    user_api.destroy({ where: { id: req.query.id } }).then(() => {
        res.status(200).json({ message: "successfully deleted", code: 200, })

    })
}

updateUser = (req, res) => {
    console.log("response =", req.file)
    user_api.update({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password,
        image: `/userimage/${req.file.filename}`
    }, { where: { id: req.query.id } }).then((data) => {
        res.status(200).json({ message: "successfully updated", code: 200, data: data })
    })
}

singleUser = (req, res) => {
    user_api.findOne({ where: { id: req.query.id } }).then((data) => {
        res.status(200).json({ message: "get single user", code: 200, data: data })
    })
}

Login = (req, res) => {

    console.log("emailvdsjfgsyfgsugfuywsfyywdfuyatdyqwa")
    user_api.findOne({ where: { email: req.body.email, password: req.body.password } }).then((data) => {
        // console.log("login==", data)
        if(data)
        {
            console.log("login ==", data)
            res.status(200).json({ message: "login successfully", code: 200, data: data })
        }
       else{
        res.status(200).json({ message: "invalid user", code: 300, data: null })
       }
    })
    .catch((error)=>{
        
        res.status(200).json({ message: "invalid user", code: 200, data: null })
    })
}













generateToken = (req, res) => {
    // Rtc Examples
    const appID = req.body.appId;
    const appCertificate = req.body.appCertificate;
    const channelName = req.body.channelName;
    const uid = 288234;
    const account = "2882341273";
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
    console.log("Token With Integer Number Uid: " + token);

    res.status(200).json({ message: "create new token", code: 200, token: token })
}





module.exports = { addUser, getAll, deleteUser, updateUser, singleUser, generateToken, Login }