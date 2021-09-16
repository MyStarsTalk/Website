//importing modules
require('dotenv').config;
const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const initWebRoutes = require("./routes/web");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");

//initializing Express
const app = express();

//use cookie parser 
app.use(cookieParser(process.env.SESSION_SECRET));

//config session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

//Enable body parser post data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app,passport);

//listening to Port
app.listen(process.env.PORT, ()=>console.log("Server is running"));