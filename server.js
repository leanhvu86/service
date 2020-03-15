const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const FacebookStrategy = require("passport-facebook").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var facebook = require("./routers/facebook");
var google = require("./routers/google");
const passport = require("passport");

require("./models/User");
require("./db/db");
require("./config/passport");
require("./models/province");
require("./models/route_rail");
require("./models/country");
require("./models/cookStep");
require("./models/cook-way");
require("./models/food_type");
require("./models/recipe");
require("./models/interest");
require("./models/ingredient");
require("./models/comment");
require("./config/facebookconfig");
require("./config/googleconfig");


global.__root   = __dirname + '/';
//Configure isProduction variable

//Initiate our server
const server = express();
const isProduction = process.env.NODE_ENV === "production";
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// enabling CORS for all requests
// Add headers
server.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type",
        "Content-Type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

server.use(require("morgan")("dev"));
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "public")));
server.use("/facebook", facebook);
server.use("/google", google);

//CORS Middleware
server.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-client-key,x-access-token, x-client-token, x-client-secret, Authorization"
    );
    next();
});
server.use(
    session({
        secret: "passport-tutorial",
        cookie: {maxAge: 60000},
        resave: false,
        saveUninitialized: false
    })
);
require("./routers/province.route")(server);
require("./routers/user.router")(server);
require("./routers/route-rail.route")(server);
require("./routers/token.router")(server);
require("./routers/country.route")(server);
require("./routers/food-type.route")(server);
require("./routers/cook-way.route")(server);
require("./routers/recipe.route")(server);
require("./routers/interest.router")(server);
require("./routers/ingredient.router")(server);
require("./routers/cook-step.route")(server);
require("./routers/comment.router")(server);
if (!isProduction) {
    server.use(errorHandler());
}

server.use(
    session({
        key: "user",
        secret: "somerandonstuffs",
        resave: false,
        cookie: {
            expires: 600000
        }
    })
);
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user) {
        res.redirect("/login");
    } else {
        next();
    }
};
// Passport session setup.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
server.post("/logintest", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect("/login");
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect("/users/");
        });
    })(req, res, next);
});
passport.use(
    new FacebookStrategy(
        {
            clientID: "538210533573481",
            clientSecret: "c62ef6efba6694e8ff087b5826052d3a",
            callbackURL: "http://localhost:3000/facebook/auth/facebook/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log("tests" + accessToken, refreshToken, profile, done);
                return done(null, profile);
            });
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID:
                "119533488129-f4gqclpfefct9s9p5kdpop9p22pouqj9.apps.googleusercontent.com",
            clientSecret: "EBg6MkFXITqBrnASBCWTY305",
            callbackURL: "http://localhost:3000/google/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                console.log("tests" + accessToken, refreshToken, profile, done);
                return done(null, profile);
            });
        }
    )
);

server.use(passport.initialize());
server.use(passport.session());

server.listen(8000, () => console.log("Server running on http://localhost:8000/"));
