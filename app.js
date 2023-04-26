require('dotenv').config()
const express=require("express")
const User=require("./models").user
const session = require("express-session")
const upload=require("./utiles/multer_providetr")
const path=require("path")
const body=require("body-parser")
const app=express()
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const toastr = require('express-toastr');
const SubCategoryRoute=require("./route/SubCategoryRoute")
const UserRoute=require("./route/UserRoute")
const CategoryRoute=require("./route/CategoryRoute")
const cron = require("node-cron");
const ChildCategoryRoute=require("./route/childCategoryRoute")
const productRoute=require("./route/ProductRoute")
const BrandRoute=require("./route/brandRoute")
const CmsRoute=require("./route/CmsRoute")
const WebRoute=require("./route/website/indexRoute")
const BlogRoute=require("./route/blogRoute")
const TrendingRoute=require("./route/trendingNowRoute")
const SettingRoute=require("./route/SettingRoute")
const UserModuleRoute=require("./route/website/UserModuleRoute")
const ContactRoute=require("./route/ContactRoute")
const ApiRoute=require("./route/api/LoginRoute")
const profileRoute=require("./route/api/profileRoute")
const BlogRute=require("./route/api/BlogRute")
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const userRegistration = require("./models").user_registration
//const FcaebookRouter =require("./route/facebookRoute")
const FacebookStrategy = require("passport-facebook").Strategy
const UserApi=require("./route/api/UserApi")

app.use(session({
    key:'user_id',
	secret: 'secadkdkdkret',
	resave: true,
	saveUninitialized: true,
    cookie:{
        expires: 3600000
    }
}));

app.use(flash());

//implementation toastr
app.use(toastr());
// end toastr
//



//header start

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept, Authortization');  
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods','*');
    next()
})

//header end


app.set("view engine","ejs")
app.use(body.urlencoded({extended:true}))
app.use(body.json())
//session
app.use((req,res,next)=>{
    app.locals.session = req.session;
    app.locals.flash = req.flash;
    
    next();
})


app.use(function (req, res, next)
{
    res.locals.toasts = req.toastr.render()
    next()
});





//google login start  



//cookieSession config
// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
//     keys: ['randomstringhere']
// }));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config
passport.use(new GoogleStrategy({
        clientID: process.env.Goggle_ClientId,
        clientSecret: process.env.Google_clientSecret,
        callbackURL: process.env.Google_callbackURL,
        //passReqToCallback:true
    },
    (accessToken, refreshToken, profile, done) => {
        //console.log(profile)
        done(null, profile); // passes the profile data to serializeUser
    }
));

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
    done(null, user);
});



// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('You must login!');
    }

}

// Routes
// app.get('/', (req, res) => {
//     res.render('index.ejs');
// });

// passport.authenticate middleware is used here to authenticate the request
app.get('/auth/google', passport.authenticate('google', {
    
    scope:['email', 'profile' ]// Used to specify the required data
    
},console.log("auth")));

// The middleware receives the data from Google and runs the function on Strategy config
app.all('/auth/google/callback', passport.authenticate('google'), (req, res) => {
   // console.log(req)
   console.log("===============")
    res.redirect('/secret');
});


// Secret route
app.get('/secret',  async(req, res) => {
    console.log(req.user._json.email)
    console.log("name ================", req.user.name.familyName+" "+req.user.name.givenName)
    let checkSameUser=await userRegistration.findOne({where:{LoginId:req.user.id}})
      
      if(checkSameUser!=null)
        {
            req.session.loggedin = true;
            req.session.newUser = checkSameUser
            req.flash('you have login') 

            res.redirect("/web")
        }
        else{
         let loginData=await   userRegistration.create({
                name: req.user.displayName,
                email:req.user._json.email,  
                password:null,  
                mobile: null,
                image: req.user._json.picture,
                status:0,
                activationCode:0000,
                loginType: req.user.provider,
                LoginId: req.user.id,             
             })

             req.session.loggedin = true;
             req.session.newUser = loginData
             req.flash('you have login')
             res.redirect("/web")



        }
   
//  res.send('You have reached the secret route');
   
});








//google login end


//login with facebook
passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.Facebook_clientID ,
        clientSecret: process.env.Facebook_clientSecret,
        callbackURL: process.env.Facebook_callbackURL,

        // profileFields: ["email","name"]
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
      }
    )
  )

  app.get("/auth/facebook", passport.authenticate("facebook"))

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/fail" }),
    async function (req, res) {
    let checkSameUser=await userRegistration.findOne({where:{LoginId:req.user.id}})

        if(checkSameUser!=null)
        {
            req.session.loggedin = true;
            req.session.newUser = checkSameUser
            req.flash('you have login') 

            res.redirect("/web")
        }
        else{
         let loginData=await   userRegistration.create({
                name: req.user.displayName,
                email:null,//req.user._json.email,  
                password:null,  
                mobile: null,
                image: req.user._json.picture,
                status:0,
                activationCode:0000,
                loginType: req.user.provider,
                LoginId: req.user.id,             
             })

             req.session.loggedin = true;
             req.session.newUser = loginData
             req.flash('you have login')
             res.redirect("/web")



        }
    console.log("facebook user============================",req)
    }
  )
  app.get("/fail", (req, res) => {
    // res.render("home", {
    //   user: req.user,
    // })
  })

  // login with facebook end
//call Api

app.use("/api",profileRoute)
app.use("/",UserApi)

app.use("/api",BlogRute)
app.use("/api",ApiRoute)
//call contact
app.use("/contact",ContactRoute)
app.use("/setting",SettingRoute)
//call user module
app.use("/user_module",UserModuleRoute)
app.use("/trending",TrendingRoute)
//call blog
app.use("/blog",BlogRoute)
// web route
app.use("/",WebRoute)
//require("./route/website/indexRoute")(app);


//USE STATIC CONTENT
app.use(express.static(path.join(__dirname, 'public')));
//index page render

//call Brand ROUTE
app.use("/brand",BrandRoute)
productRoute
//call User ROUTE
app.use("/",UserRoute)
//call Product ROUTE
app.use("/",productRoute)
// call category route
app.use("/", CategoryRoute)
// call category route
app.use("/",SubCategoryRoute)
//call child category
app.use("/child",ChildCategoryRoute)
//call cms
app.use("/",CmsRoute)
// app.use("/blog",(req,res)=>{

//     res.render("website/index")
   
// })



//app.use("/", FcaebookRouter);

// app.use("/",(req,res)=>{
//     res.redirect("/")
// })

// app.all("*",(req,res,next)=>{

//     res.redirect("/web")
    
// })

// app.get("/:universalURL", (req, res) => {
//     res.send("404 URL NOT FOUND");
// });



//cron job start

// cron.schedule("*/10 * * * * *", function() {
//     console.log("running a task every 10 second");
// });




//cron jon end


app.listen(process.env.Port, () => {
    console.log(`Server running at http://localhost:${process.env.Port}/`);
  });