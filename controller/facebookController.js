// //import passport from "passport";
// const passport=require("passport")
// //import dotenv from "dotenv";
// //import strategy from "passport-facebook";
// const strategy=require("passport-facebook")

// //import userModel from "../user/user.model";

// const FacebookStrategy = strategy.Strategy;


// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "943296959911744",
//       clientSecret: "f01103e730349732a0fcf45873f80c88",
//       callbackURL:"http://localhost:1000/auth/facebook/callback",// process.env.FACEBOOK_CALLBACK_URL,
//       profileFields: ["email", "name"]
//     },
//     function(accessToken, refreshToken, profile, done) {
//     //   const { email, first_name, last_name } = profile._json;
//     //   const userData = {
//     //     email,
//     //     firstName: first_name,
//     //     lastName: last_name
//     //   };
//     //   new userModel(userData).save();
//       done(null, profile);
//     }
//   )
// );