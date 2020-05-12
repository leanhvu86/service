const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Comments = mongoose.model('Comments');
const Recipe = mongoose.model('Recipes');
const Users = mongoose.model("Users");
exports.getComments = (async (req, res) => {

    await Comments.find()
        .then(comments => {
            res.status(200).send({comments:comments}
            )
        }).catch(err => {
            console.log(err);
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding comment'
            })
        })
});

exports.findComment = async (req, res) => {
    await Comments.findOne({type: 1}, function (err, comments) {
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
};
exports.createComment = (req, res) => {
    const comment = new Comments({
        user: req.body.comment.user,
        recipe: req.body.comment.recipe,
        content: req.body.comment.content,
        imageUrl: req.body.comment.imageUrl,
        type: req.body.comment.type,
        order:0,
    });
    Users.findOne({email: req.body.comment.user}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                'message': err
            });
        }
        if (userSchema) {
            const userId= req.email;
            console.log(userId);
            console.log(userSchema.email);
            if(userId !== userSchema.email){
                return res.send({
                    'status': 401,
                    'message': 'Thí chú không có quyền. Vui lòng liên hệ admin nhé!'
                })
            }
            Comments.find()
                .then(commentChecks => {
                let cmCheck = new Comments();
                commentChecks.forEach(element => {
                    if (element.recipe._id === comment.recipe._id && element.user.email === comment.user
                        && element.content === comment.content && element.imageUrl === comment.imageUrl&& element.type===1) {
                        cmCheck = element;
                        console.log(element._id);
                    }
                    if(element.recipe._id===comment.recipe._id&&element.content!==''){
                        comment.order++;
                    }
                });
                    if (cmCheck.user !== undefined) {
                        console.log(cmCheck.user.toString());
                    return res.send({
                        'status': 205,
                        'message': 'Bạn đã thực hiện công thức này'
                    })
                } else {
                    comment.order++;
                    console.log(cmCheck);
                    comment.user = userSchema;
                    comment.save()
                        .then(() => {
                            Recipe.findOne({_id: req.body.comment.recipe._id}, function (err, recipe) {
                                if (err) {
                                    console.log(err);
                                    return res.send({
                                        'status': 401,
                                        'message': 'không tìm thấy công thức'
                                    })
                                } else {
                                    recipe.doneCount++;
                                    recipe.save((function (err) {
                                        if (err) {
                                            console.log(err);
                                            return res.send({
                                                status: 401,
                                                'message': "Error"
                                            });
                                        } else {
                                            return res.send({
                                                recipe: recipe,
                                                comment: comment,
                                                status: 200,
                                                'message': "Thêm bình luận thành công"
                                            });
                                        }
                                    }));
                                }
                            })
                        }).catch(err => {
                        res.status(500).send({
                            'message': err.message || 'Some error occurred while creating the comment'
                        });
                    });
                }
            }).catch(err => {
                res.send({
                    'status': 205,
                    'message': err.message || 'Some error occurred while creating the comment'
                })
            })
        } else {
            return res.send({
                status: 403,
                message: err
            });
        }
    });

};
exports.deleteComment = (auth.optional,
    (req, res) => {
        var mongoose = require('mongoose');
        var id = mongoose.Types.ObjectId(req.body.comment.id);
        Comments.deleteOne({ _id: id }, function (err) {
            console.log('deleting projects');
            if (err) {
                console.log(err);
                return res.send({
                    status: 401,
                    message: "lỗi xóa comment"
                });
            }
            // delete project references
            return res.send({
                status: 200,
                message: "xóa comment thành công"
            });
        });
    });
