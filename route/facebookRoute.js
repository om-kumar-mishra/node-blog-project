// //import express from "express";
// const express=require("express")
// //import passport from "passport";
// const passport=require("passport")
// //import userController from "./user.controller";
// const facebookController=require("../controller/facebookController")

// const userRouter = express.Router();

// //userRouter.get("/auth/facebook", passport.authenticate("facebook"));

// userRouter.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/success",
//     failureRedirect: "/fail"
//   })
// );

// userRouter.get("/fail", (req, res) => {
//   res.send("Failed attempt");
// });

// userRouter.get("/success", (req, res) => {
//     console.log(req)
//   res.send("Success");
// });
// module.exports=userRouter;
