const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const facebook = require("./routers/facebook");
const google = require("./routers/google");
const passport = require("passport");
const RateLimit = require('express-rate-limit');
const multer = require('multer');
const PATH = './uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {

        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer({storage: storage, fileFilter: fileFilter});

require("./models/User");
require("./models/Token");
require("./db/db");
require("./config/passport");
require("./models/province");
require("./models/route_rail");
require("./models/country");
require("./models/cookStep");
require("./models/cook-way");
require("./models/gallery");
require("./models/food_type");
require("./models/recipe");
require("./models/interest");
require("./models/ingredient");
require("./models/comment");
require("./config/facebookconfig");
require("./config/googleconfig");
require("./models/message");
require("./models/summary");
const cron = require('node-schedule');
const Tokens = require("./models/Token");
global.__root = __dirname + '/';
//Configure isProduction variable

//Initiate our server
const app = express();
const isProduction = process.env.NODE_ENV === "production";
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// enabling CORS for all requests
// Add headers
app.use(function (req, res, next) {
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

app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/facebook", facebook);
app.use("/google", google);

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-client-key,x-access-token, x-client-token, x-client-secret,x-access-user, Authorization"
    );
    next();
});
app.use(
    session({
        secret: "passport-tutorial",
        cookie: {maxAge: 60000},
        resave: false,
        saveUninitialized: false
    })
);
require("./routers/province.route")(app);
require("./routers/user.router")(app);
require("./routers/route-rail.route")(app);
require("./routers/token.router")(app);
require("./routers/country.route")(app);
require("./routers/food-type.route")(app);
require("./routers/cook-way.route")(app);
require("./routers/recipe.route")(app);
require("./routers/interest.router")(app);
require("./routers/ingredient.router")(app);
require("./routers/cook-step.route")(app);
require("./routers/comment.router")(app);
require("./routers/util.router")(app);
require("./routers/message.router")(app);
require("./routers/gallery.router")(app);
require("./routers/summary.router")(app);
if (!isProduction) {
    app.use(errorHandler());
}

app.use(express.static(path.join(__dirname, "public")));
app.use("upload", function (request, response, next) {
    next();
});
app.get('/api', function (req, res) {
    res.end('File catcher');
});

// POST File
app.post('/api/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        console.log('File is available!', res.req.file.filename);
        return res.send({
            success: true,
            filePath: res.req.file.filename
        })
    }
});
// delete File
app.post('/api/deleteImage/:imgName', function (req, res) {
    let imgName = req.params.imgName;
    console.log(req.params);
    let arrDelete = imgName.split(',');
    try {
        arrDelete.forEach((path) => {
            let filePath = `${__dirname}/uploads/` + path;
            fs.unlinkSync(filePath);
        })
    } catch (err) {
        console.error(err);
    }
    return res.send({
        success: true
    })
});

// GET File

let mime = require('mime');
let fs = require('fs');

app.get('/api/images/:imgName', function (req, res) {
    let imgName = req.params.imgName;
    //const file = `${__dirname}/uploads/`+imgName;
    //res.download(file);
    let file = `${__dirname}/uploads/` + imgName;

    let filename = path.basename(file);
    let mimetype = mime.lookup(file);
    // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-disposition', mimetype);
    // res.setHeader('Content-type', mimetype);

    let filestream = fs.createReadStream(file);
    filestream.pipe(res);
});
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
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
app.post("/logintest", function (req, res, next) {
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
const rule = new cron.RecurrenceRule();
rule.dayOfWeek = [5, 6, 0, 1, 2, 3, 4,];
rule.hour = 8;
rule.minute = 30;
cron.scheduleJob(rule, function () {
    Tokens.deleteMany({}, function (error) {
        if (error) console.log(error);
        console.log('delete tokens successful')
    })
    console.log(new Date(), 'The 30th second of the minute.');
});
app.use(passport.initialize());
app.use(passport.session());

app.enable('trust proxy');
// only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var limiter = new RateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
});

//  apply to all requests
app.use(limiter);
// const http = require('http');
// const server = http.Server(app);

// const socketIO = require('socket.io');
// const io = socketIO(server);
server = require('http').createServer(app),
    io = require('socket.io').listen(server)
const port = process.env.PORT || 8000;
listUserOnline = {}
io.sockets.on('connection', function (socket) {
    let cookie = socket.request.headers.cookie;
    console.log(socket.request.headers)
    if (cookie !== undefined) {
        let cookieArray = cookie.split(';');
        let user = '';
        cookieArray.forEach(key => {
            if (key.indexOf('ObjectId') !== -1) {
                let array = key.split('=');
                user = array[1].trim();
            }
        });
        if (user !== '') {
            //  console.log(user + '-' + socket.id)
            listUserOnline[user] = socket.id;
        }
    }
    // listUserOnline[check] = socket.id;
    // tại đây khi mà io đc gửi lên e cho a cái hàm send message lại cho chính cái io đấy ở bên angular gửi tin nhắn đó
    // socket.emit('wellcome',{mess: }
    socket.on('setSocketId', function (socketData) {
        let userName = socketData.name + '-' + socketData.userId;
        console.log(userName);
        listUserOnline[userName] = socket;

        console.log(Object.keys(listUserOnline))
    });
    socket.on('new-message', (message) => {
        let ObjectId = message.objectId;
        let sendMessage = message.message;
        let id = listUserOnline[ObjectId];
        console.log(' id nè' + id)
        console.log(' user nè ' + sendMessage)
        // listUserOnline[message]=socket;
        socket.broadcast.to(id).emit('message', sendMessage);
    });
    console.log(Object.keys(listUserOnline))
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
/*
var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});
*/
