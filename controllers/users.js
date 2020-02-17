const mongoose = require("mongoose");
const passport = require("passport");
const auth = require("../routers/auth");
const Users = mongoose.model("Users");
const Tokens = require("../models/Token");
//POST new user route (optional, everyone has access)

exports.create =
  (auth.optional,
  (req, res, next) => {
    var user = {
      email: req.body.user.email,
      password: req.body.user.password
    };

    const finalUser = new Users(user);

    Users.findOne({ email: user.email }, function(err, users) {
      if (users !== null) {
        return res.status(422).json({
          errors: {
            email: "Email existed in system,please input an other email"
          }
        });
      }
    });

    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: "is required"
        }
      });
    }

    if (!user.password) {
      return res.status(423).json({
        errors: {
          password: "is required"
        }
      });
    }

    finalUser.setPassword(user.password);

    console.log("Email:" + finalUser.email);
    console.log("Passowrd:" + finalUser.passport);
    return finalUser.save().then(() =>
      res.status(200).send({
        status: 200,
        user: finalUser.toAuthJSON()
      })
    );
  });

exports.test = (req, res, next) => {
  console.log("testet");
  return res.status(422).json({
    errors: {
      password: "is required"
    }
  });
};
//POST login route (optional, everyone has access)
exports.login =
  (auth.optional,
  (req, res, next) => {
    var user = {
      email: req.body.user.email,
      password: req.body.user.password
    };
    console.log("ss" + user.password);
    console.log("ss" + user.email);

    if (!user.email) {
      return res.status(422).json({
        errors: {
          email: "is required"
        }
      });
    }

    if (!user.password) {
      return res.status(422).json({
        errors: {
          password: "is required"
        }
      });
    }

    Users.findOne({ email: user.email }, function(err, userSchema) {
      if (err) {
        return res.send({
          status: 401,
          message: "Error"
        });
      }
      console.log("UserName: " + userSchema.email);
      console.log("Password:" + userSchema.password);
      if (!userSchema) {
        return res.send({
          status: 401,
          message: "Username or password invalid"
        });
      }
      if (!userSchema.validatePassword(user.password)) {
        return res.send({
          status: 401,
          message: "Username or password invalid"
        });
      }

      if (user) {
        const user = new Users();
        user.token = user.generateJWT();
        req.session.token = user.token;
        const finalUser = new Tokens({
          email: user.email
        });
        finalUser.token = user.token;
        finalUser.save().then(() => console.log("save token thanh cong"));
        req.session.email = user.email;
        return res.send({
          status: 200,
          user: user.toAuthJSON()
        });
      } else {
        return res.send({
          status: 403,
          message: "Account not found"
        });
      }
    });
  });

//GET current route (required, only authenticated users have access)
exports.currentAuthen =
  (auth.required,
  async (req, res, next) => {
    //const {body: {email}} = req;
    var email = req.body.email;
    console.log("email nè" + email);

    await Users.findOne({ email: "leminhanh2014@gmail.com" }, function(
      err,
      userObj
    ) {
      if (err) {
        console.log(err);
        return res.send({
          status: 404,
          message: "can not found current user"
        });
      } else if (userObj) {
        console.log("Found:", userObj);

        console.log(" id nguoi dung ne " + userObj.id);
        Tokens.findOne({ email: userObj.email }, function(err, tokens) {
          if (tokens) {
            console.log(req.session.token);
            return res.send({
              status: 200,
              token: tokens.token
            });
          } else {
            return res.send({
              status: 401,
              message: "can not found token"
            });
          }
        });
      } else {
        console.log("User not found!");
        return res.send({
          status: 404,
          currenAuthenication: "current user not found"
        });
      }
    });

    // .then((user) => {
    //         if (!user) {
    //             return res.status(400).send({
    //                 message: "can not found current user"
    //             });
    //         } else {
    //             console.log(" id nguoi dung ne " + user.id);
    //             Tokens.findById(user.id).then((tokens) => {
    //                 if (tokens) {
    //                     return res.send({
    //                         "status": 200,
    //                         "token": tokens.token
    //                     })
    //                 } else {
    //                     return res.send({
    //                         "status": 401,
    //                         "message": "can not found token"
    //                     })
    //                 }
    //             })
    //         }
    //     }).catch(error => {
    //         return res.send({
    //             "status": 403,
    //             "message": "current user is not exist"
    //         });
    //     })

    // return Users.find({ email: email })
    //     .then((user) => {
    //         if (!user) {
    //             return res.status(400).send({
    //                 message: "can not found current user"
    //             });
    //         }

    //         return res.json({
    //             "status": 200,
    //             //user: user.toAuthJSON()
    //         });
    //     });
  });
exports.logout =
  ("/logout",
  (req, res) => {
    if (req.session.user && req.cookies.token) {
      res.clearCookie("user");
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
