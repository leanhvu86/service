const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Messages = mongoose.model('Messages');
const Users = mongoose.model("Users");
exports.getMessages = (async (req, res) => {
    await Messages.find()
        .then(messages => {
            res.status(200).send(messages
            )
        }).catch(err => {
            console.log(err);
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding message'
            });
        });
});

exports.findMessage = async (req, res) => {
    await Messages.find({user: req.body.user.email}, function (err, messages) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'message not found'
            })
        } else {
            for (let mess of messages) {
                mess.news++;
                mess.save().then(() => {
                });
            }
            res.status(200).send({
                message: messages
            })
        }
    }).sort({
        createdAt: -1
    })
        .limit(10)
};
exports.createMessage = (req, res) => {
    const message = new Messages({
        user: req.body.message.user,
        content: req.body.message.content
    });
    Users.findOne({email: req.body.message.user}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        if (userSchema) {
            message.user = userSchema
        } else {
            return res.send({
                status: 403,
                message: err
            });
        }
    });
    message.save()
        .then(() => {
            return res.send({
                result: message,
                status: 200,
                message: "Thêm điểm thành công"
            });
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        });
    });
};
exports.deleteMessage = (auth.optional,
    (req, res) => {
        const message = new Messages({
            user: req.body.message.user.email
        });
        Messages.find({user: message.user})
            .then((messages) => {
                if (!messages) {
                    return res.status(400).send({
                        message: "can not found current user"
                    });
                }
                Messages.deleteOne({_id: messageed._id}, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send({
                            status: 401,
                            message: "lỗi xóa lượt ưu thích"
                        });
                    } else {
                        return res.send({
                            result: result,
                            status: 200,
                            message: "xóa điểm thành công"
                        });
                    }
                });
            });
    });
