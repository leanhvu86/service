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
require("./models/route_rail")
require("./config/facebookconfig");
require("./config/googleconfig");
//Configure isProduction variable

//Initiate our app
const app = express();
const isProduction = process.env.NODE_ENV === "production";
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// enabling CORS for all requests
// Add headers
app.use(function(req, res, next) {
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
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/facebook", facebook);
app.use("/google", google);

//CORS Middleware
app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
app.use(
  session({
    secret: "passport-tutorial",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);
require("./routers/province.route")(app);
require("./routers/user.router")(app);
require("./routers/route-rail.route")(app);
if (!isProduction) {
  app.use(errorHandler());
}

app.use(
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
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
app.post("/logintest", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
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
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
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
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        console.log("tests" + accessToken, refreshToken, profile, done);
        return done(null, profile);
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(8000, () => console.log("Server running on http://localhost:8000/"));
