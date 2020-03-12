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
                password: req.body.user.password,
                name: req.body.user.user,
                totalPoint: 0,
                imageUrl: req.body.user.imageUrl
            };

            const finalUser = new Users(user);

            Users.findOne({email: user.email}, function (err, users) {
                if (users !== null) {
                    return res.status(422).json({
                        message: "Email đã tồn tại trong hệ thống. Vui lòng chọn email khác"

                    });
                }
            });

            if (!user.email) {
                return res.status(422).json({
                    message:
                        "email is required"

                });
            }

            if (!user.password) {
                return res.status(423).json({
                    message:
                        "Password không được để trống"

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

exports.testEmail = (req, res, next) => {
    console.log("testet" + req.body.email);
    Users.findOne({email: req.body.email}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        console.log("UserName: " + userSchema.email);
        console.log("Password:" + userSchema.password);
        if (userSchema) {
            return res.send({
                status: 200,
                user: userSchema,
                message: "Thêm điêm thành công"
            });
        } else {
            return res.send({
                status: 403,
                message: err
            });
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

            Users.findOne({email: user.email}, function (err, userSchema) {
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
                        email: userSchema.email
                    });
                    console.log(userSchema.email);
                    finalUser.token = user.token;
                    finalUser.save().then(() => console.log("save token thanh cong"));
                    req.session.email = user.email;
                    return res.send({
                        status: 200,
                        user: user.toAuthJSON(),
                        role: userSchema.role
                    });
                } else {
                    return res.send({
                        status: 403,
                        message: "Account not found"
                    });
                }
            });
        });

exports.logout =
    ("/logout",
        (req, res) => {
            if (req.session.user && req.cookies.token) {
                console.log("token" + req.cookies.token);
                res.clearCookie("user");
                res.redirect("/");
            } else {
                res.redirect("/login");
            }
        });
exports.addPoint = (req, res, next) => {
    console.log("testet" + req.body.user);
    Users.findOne({email: req.body.user.email}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: "Error"
            });
        }
        console.log("UserName: " + userSchema.email);
        console.log("Password:" + userSchema.password);
        if (userSchema) {
            userSchema.totalPoint++;
            userSchema.save((function (err) {
                if (err) {
                    console.log(err);
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    return res.send({
                        status: 200,
                        message: "Thêm điểm thành công"
                    });
                }
            }))
        } else {
            return res.send({
                status: 403,
                message: "Account không tìm thấy"
            });
        }
    });
};
exports.removePoint = (req, res, next) => {
    console.log("testet" + req.body.user.email);
    Users.findOne({email: req.body.user.email}, function (err, userSchema) {
        if (err) {
            console.log(err);
            return res.send({
                status: 401,
                message: "Error"
            });
        }
        console.log("UserName: " + userSchema.email);
        console.log("Password:" + userSchema.password);
        if (userSchema) {
            console.log(userSchema.totalPoint);
            if (userSchema.totalPoint !== undefined) {
                let point = userSchema.totalPoint
                if (parseInt(userSchema.totalPoint) > 0) {
                    userSchema.totalPoint--;
                    console.log(userSchema.totalPoint);
                } else {
                    return res.send({
                        status: 401,
                        message: "Sorry đã hết điểm để trừ rồi bạn ạ"
                    });
                }
                userSchema.save((function (err) {
                    if (err) {
                        console.log(err);
                        return res.send({
                            status: 401,
                            message: "Error"
                        });
                    } else {
                        return res.send({
                            status: 200,
                            message: "Trừ điểm thành công"
                        });
                    }
                }))
            }
        }
    });
};
exports.getUsers = (async (req, res, next) => {
    await Users.find()
        .then(users => {
            res.status(200).send(users
            )
        }).catch(err => {
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding users'
            })
        })
});

exports.updateRole = async (req, res, next) => {
    console.log('helo' + req.body.user.user._id)
    console.log('helo' + req.body.user.role)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.user.user._id);
    await Users.findOne({_id: id}, function (err, user) {
        if (err || user === null) {
            console.log(user)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            console.log(user)
            user.role=req.body.user.role;
            user.save((function (err) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    return res.status(200).send({
                        status:200,
                        user:user
                    });
                }
            }));
        }
    })
}

exports.updateReport = async (req, res, next) => {
    console.log('helo' + req.body.user.user._id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.user.user._id);
    await Users.findOne({_id: id}, function (err, user) {
        if (err || user === null) {
            console.log(user)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            console.log(user)
            user.warningReport++;
            user.save((function (err) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    return res.status(200).send({
                        status:200,
                        user:user
                    });
                }
            }));
        }
    })
}
exports.bannedUser = async (req, res, next) => {
    console.log('helo' + req.body.user.user._id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.user.user._id);
    await Users.findOne({_id: id}, function (err, user) {
        if (err || user === null) {
            console.log(user)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            console.log(user)
            user.status=0;
            user.save((function (err) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    return res.status(200).send({
                        status:200,
                        user:user
                    });
                }
            }));
        }
    })
}
