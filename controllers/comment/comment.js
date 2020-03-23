const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Comments = mongoose.model('Comments');
const Recipe = mongoose.model('Recipes');
const Users = mongoose.model("Users");
exports.getComments = (async (req, res, next) => {

    await Comments.find()
        .then(comments => {
            res.status(200).send(comments
            )
        }).catch(err => {
            console.log(err);
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding comment'
            })
        })
});

exports.findComment = async (req, res, next) => {
    await Comments.findOne({user: req.body.user.email}, function (err, comments) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'comment not found'
            })
        } else {
            res.send({
                'status': 200,
                comment: comments
            })
        }
    })
}
exports.createComment = (req, res) => {
    const comment = new Comments({
        user: req.body.comment.user,
        recipe: req.body.comment.recipe,
        content: req.body.comment.content,
        imageUrl: req.body.comment.imageUrl,
        type: req.body.comment.type
    })
    Users.findOne({email:req.body.comment.user}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        if (userSchema) {
            comment.user=userSchema
        } else {
            return res.send({
                status: 403,
                message: err
            });
        }
    });
    comment.save()
        .then(data => {
            Recipe.findOne({id: req.body.comment.recipe.id}, function (err, recipe) {
                if (err) {
                    console.log(err);
                    return res.send({
                        'status': 401,
                        'message': 'recipe not found'
                    })
                } else {
                    recipe.doneCount++;
                    recipe.save((function (err) {
                        if (err) {
                            console.log(err);
                            return res.send({
                                status: 401,
                                message: "Error"
                            });
                        } else {
                            return res.send({
                                recipe: recipe,
                                comment:comment,
                                status: 200,
                                message: "Thêm điểm thành công"
                            });
                        }
                    }));
                }
            })
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
}
exports.deleteComment= (auth.optional,
    (req, res, next) => {
        const comment = new Comments({
            user: req.body.comment.user.email,
            recipe: req.body.comment.recipe
        })
        Comments.find({user: comment.user})
            .then((comments) => {
                if (!comments) {
                    return res.status(400).send({
                        message: "can not found current user"
                    });
                }

                for (let commented of comments) {
                    if (comment.recipe._id === commented.recipe._id) {

                        Comments.deleteOne({_id: commented._id}, function (err, result) {
                            if (err) {
                                console.log(err);
                                return res.send({
                                    status: 401,
                                    message: "lỗi xóa lượt ưu thích"
                                });
                            } else {
                                Recipe.findOne({id: req.body.comment.recipe .id}, function (err, recipe) {
                                    if (err) {
                                        console.log(err);
                                        return res.send({
                                            'status': 401,
                                            'message': 'recipe not found'
                                        })
                                    } else {
                                        recipe.doneCount--;
                                        recipe.save((function (err) {
                                            if (err) {
                                                return res.send({
                                                    status: 401,
                                                    message: "Error"
                                                });
                                            } else {
                                                return res.send({
                                                    recipe: recipe,
                                                    status: 200,
                                                    message: "xóa điểm thành công"
                                                });
                                            }
                                        }));
                                    }
                                })
                            }
                        });
                    }
                }
            });
    });
