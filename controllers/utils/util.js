const  nodeMailer = require('nodemailer');
// const mongoose = require('mongoose');
// const auth = require("../../routers/auth");
// const Interests = mongoose.model('Interests');
// const Recipe = mongoose.model('Recipes');
// exports.getInterests = (async (req, res, next) => {
//
//     await Interests.find()
//         .then(interests => {
//             res.status(200).send(interests
//             )
//         }).catch(err => {
//             console.log(err);
//             res.send({
//                 'status': 404,
//                 'message': err.message || 'Some error occurred while finding interest'
//             })
//         })
// });
//
// exports.findInterest = async (req, res, next) => {
//
//     console.log(req.body)
//     await Interests.findOne({user: req.body.user}, function (err, interests) {
//         if (err) {
//             console.log(err);
//             return res.send({
//                 'status': 401,
//                 'message': 'interest not found'
//             })
//         } else {
//             console.log(interests)
//             res.status(200).send(interests
//             )
//         }
//     })
// }
// exports.createInterest = (req, res) => {
//     const interest = new Interests({
//         user: req.body.interest.objectId.user.email,
//         objectId: req.body.interest.objectId,
//         objectType: req.body.interest.objectType
//     })
//
//     interest.save()
//         .then(data => {
//             Recipe.findOne({id: req.body.interest.objectId.id}, function (err, recipe) {
//                 if (err) {
//                     console.log(err);
//                     return res.send({
//                         'status': 401,
//                         'message': 'recipe not found'
//                     })
//                 } else {
//                     recipe.totalPoint++;
//                     recipe.save((function (err) {
//                         if (err) {
//                             console.log(err);
//                             return res.send({
//                                 status: 401,
//                                 message: "Error"
//                             });
//                         } else {
//                             return res.send({
//                                 recipe: recipe,
//                                 status: 200,
//                                 message: "Thêm điểm thành công"
//                             });
//                         }
//                     }));
//                 }
//             })
//         }).catch(err => {
//         res.status(500).send({
//             message: err.message || 'Some error occurred while creating the note'
//         })
//     })
// }
// exports.deleteInterest = (auth.optional,
//     (req, res, next) => {
//         const interest = new Interests({
//             user: req.body.interest.objectId.user.email,
//             objectId: req.body.interest.objectId,
//             objectType: req.body.interest.objectType
//         })
//         Interests.find({user: interest.user})
//             .then((interests) => {
//                 if (!interests) {
//                     return res.status(400).send({
//                         message: "can not found current user"
//                     });
//                 }
//                 for (let interested of interests) {
//                     if (interest.objectId._id === interested.objectId._id) {
//
//                         Interests.deleteOne({_id: interested._id}, function (err, result) {
//                             if (err) {
//                                 console.log(err);
//                                 return res.send({
//                                     status: 401,
//                                     message: "lỗi xóa lượt ưu thích"
//                                 });
//                             } else {
//                                 Recipe.findOne({id: req.body.interest.objectId.id}, function (err, recipe) {
//                                     if (err) {
//                                         console.log(err);
//                                         return res.send({
//                                             'status': 401,
//                                             'message': 'recipe not found'
//                                         })
//                                     } else {
//                                         recipe.totalPoint--;
//                                         recipe.save((function (err) {
//                                             if (err) {
//                                                 return res.send({
//                                                     status: 401,
//                                                     message: "Error"
//                                                 });
//                                             }
//                                         }));
//                                     }
//                                 })
//
//                             }
//                         });
//                     }
//                 }return res.send({
//                     result: 'true',
//                     status: 200,
//                     message: "xóa điểm thành công"
//                 });
//             });
//     });


exports.sendMail=((req, res)=> {
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
        to: 'vulaph06891@fpt.edu.vn', // list of receivers
        subject: 'Chào mừng đến trang web Ẩm thực Ăn chay', // Subject line
        text: req.body.body, // plain text body
        html: 'Chúc mừng bạn đã đăng ký thành công tài khoản trên trang web Ẩm thực ăn chay ' +
            '/n Vui lòng xác thực tài khoản đăng ký bằng link sau:' +
            '/n http://localhost:4200/' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.status(200).send({
            message:'send mail success'
        });
    });
});
