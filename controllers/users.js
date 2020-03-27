const mongoose = require("mongoose");
const passport = require("passport");
const auth = require("../routers/auth");
const Users = mongoose.model("Users");
const Tokens = require("../models/Token");
const nodeMailer = require('nodemailer');
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
                    return res.send({
                        status: 422,
                        message: "Email đã tồn tại trong hệ thống. Vui lòng chọn email khác"

                    });
                } else {
                    if (!user.email) {
                        return res.status(422).send({
                            status: 422,
                            message:
                                "email is required"

                        });
                    }

                    if (!user.password) {
                        return res.status(423).send({
                            status: 422,
                            message:
                                "Password không được để trống"

                        });
                    }

                    finalUser.setPassword(user.password);
                    let transporter = nodeMailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'leanhvu86@gmail.com',
                            pass: 'leanhvu123'
                        }
                    });
                    let mailOptions = {
                        from: 'Ban quản trị website Ẩm thực ăn chay <leanhvu86@gmail.com>', // sender address
                        to: user.email, // list of receivers
                        subject: 'Chào mừng đến trang web Ẩm thực Ăn chay', // Subject line
                        text: req.body.body, // plain text body
                        html: 'Chúc mừng bạn đã đăng ký thành công tài khoản trên trang web Ẩm thực ăn chay ' +
                            '<br> Vui lòng xác thực tài khoản đăng ký bằng link sau:' +
                            '<br> http://localhost:4200/active/' + finalUser._id
                        // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                    });
                    return finalUser.save().then(() =>
                        res.status(200).send({
                            message: 'Chúc mừng bạn đăng ký tài khoản thành công. Vui lòng check mail',
                            status: 200,
                            user: finalUser.toAuthJSON()
                        })
                    );
                }
            });
        });

exports.testEmail = (req, res, next) => {
    if (req.body.email !== undefined || req.body.email !== '') {
        Users.findOne({email: req.body.email}, function (err, userSchema) {
            if (err) {
                return res.send({
                    status: 401,
                    message: err
                });
            }
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
    } else {
        return res.send({
            status: 401,
            message: 'email not found'
        });
    }

};
//POST login route (optional, everyone has access)
exports.login =
    (auth.optional,
        (req, res, next) => {
            var user = {
                name: req.body.user.user,
                email: req.body.user.email,
                password: req.body.user.password
            };
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
                if (userSchema.role < -1) {
                    return res.send({
                        status: 403,
                        message: "Tài khoản của bạn đã bị khóa!"
                    });
                }
                if (userSchema.role < 0) {
                    return res.send({
                        status: 403,
                        message: "Username chưa xác thực email"
                    });
                }
                if (user) {
                    const user = new Users();
                    user.token = user.generateJWT();
                    req.session.token = user.token;
                    const finalUser = new Tokens({
                        email: userSchema.email
                    });
                    if (userSchema.imageUrl === undefined) {
                        userSchema.imageUrl = 'jbiajl3qqdzshdw0z749'
                    }
                    role = userSchema.role;
                    if (role === 0) {
                        role = '';
                    }
                    finalUser.token = user.token;
                    finalUser.save().then(() => console.log("save token thanh cong"));
                    req.session.email = user.email;
                    return res.send({
                        status: 200,
                        user: user.toAuthJSON(),
                        role: role,
                        image: userSchema.imageUrl
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
                     res.send({
                        status: 401,
                        message: "Sorry đã hết điểm để trừ rồi bạn ạ"
                    });
                }
                userSchema.save((function (err) {
                    if (err) {
                        console.log(err);
                         res.send({
                            status: 401,
                            message: "Error"
                        });
                    } else {
                         res.send({
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
    console.log('helo' + req.body.user.id)
    console.log('helo' + req.body.user.role)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.user.id);
    await Users.findOne({_id: id}, function (err, user) {
        if (err || user === null) {
            console.log(user)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            console.log(user)
            user.role = req.body.user.role;
            if (user.role === 0) {
                user.warningReport = 0;
            } else {
                user.warningReport = user.role;
            }
            user.save((function (err) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    return res.status(200).send({
                        status: 200,
                        user: user
                    });
                }
            }));
        }
    })
}

exports.updateReport = async (req, res, next) => {
    console.log('helo' + req.body.user.id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.user.id);
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
                        status: 200,
                        user: user
                    });
                }
            }));
        }
    })
}
exports.bannedUser = async (req, res, next) => {
    console.log('helo' + req.body.user.id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.user.id);
    await Users.findOne({_id: id}, function (err, user) {
        if (err || user === null) {
            console.log(user)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            console.log(user)
            user.status = -2;
            user.save((function (err) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    let transporter = nodeMailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'leanhvu86@gmail.com',
                            pass: 'leanhvu123'
                        }
                    });
                    let mailOptions = {
                        from: 'Ban quản trị website Ẩm thực ăn chay <leanhvu86@gmail.com>', // sender address
                        to: user.email, // list of receivers
                        subject: 'Chào mừng đến trang web Ẩm thực Ăn chay', // Subject line
                        text: req.body.body, // plain text body
                        html: 'Tài khoản của bạn đã bị khóa vì vi pham quy định của diễn đàn, pháp luật của nhà nước.' +
                            'Vui lòng liên hệ lại với email: amthuc.anchay.support@gmaillcom'
                        // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                    return res.status(200).send({
                        status: 200,
                        user: user
                    });
                }
            }));
        }
    })
}
exports.activeMember = async (req, res, next) => {
    console.log('helo' + req.params.id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.params.id);
    await Users.findOne({_id: id}, function (err, user) {
        if (err || user === null) {
            console.log(user)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            console.log(user)
            user.role = 0;
            user.status = 1;
            user.save((function (err) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    let transporter = nodeMailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'leanhvu86@gmail.com',
                            pass: 'leanhvu123'
                        }
                    });
                    let mailOptions = {
                        from: 'Ban quản trị website Ẩm thực ăn chay <leanhvu86@gmail.com>', // sender address
                        to: user.email, // list of receivers
                        subject: 'Chào mừng đến trang web Ẩm thực Ăn chay', // Subject line
                        text: req.body.body, // plain text body
                        html: 'Xin chúc mừng! Tài khoản của bạn đã được mở. Vui lòng đăng nhập trang chủ website Ẩm thực Ăn chay' +
                            ':http://localhost:4200'
                        // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                    return res.status(200).send(user);
                }
            }));
        }
    })
}
exports.getMemerInfo = async (req, res, next) => {
    console.log('helo' + req.params.id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.params.id);
    await Users.findOne({_id: id}, function (err, user) {
        if (err || user === null) {
            console.log(user)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            return res.status(200).send(user);

        }
    })
}
exports.getTopUsers = (async (req, res, next) => {
    await Users.find()
        .sort({totalPoint: -1})
        .limit(10)
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

