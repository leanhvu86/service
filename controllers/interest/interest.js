const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Interests = mongoose.model('Interests');
const Recipe = mongoose.model('Recipes');
const Gallery = mongoose.model('Gallerys');

const Users = mongoose.model("Users");
exports.getInterests = (async (req, res) => {

    await Interests.find()
        .then(interests => {
            res.status(200).send(interests
            )
        }).catch(err => {
            console.log(err);
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding interest'
            })
        })
});

exports.findInterest = async (req, res) => {
    console.log(req.body);
    await Interests.find({user: req.body.user.email}, function (err, interests) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'interest not found'
            })
        } else {
            res.status(200).send({interests:interests}
            )
        }
    });
};
exports.findInterestGallery = async (req, res) => {
    console.log(req.body);
    await Interests.find({user: req.body.user.email, objectType: "2"}, function (err, interests) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'interest not found'
            })
        } else {
            res.status(200).send({interests:interests}
            )
        }
    });
};
exports.createInterest = (req, res) => {
    const interest = new Interests({
        user: req.body.object.user,
        objectId: req.body.object.objectId,
        objectType: req.body.object.objectType
    });
    var mongoose = require('mongoose');
    let id = mongoose.Types.ObjectId(req.body.object.objectId._id);
    console.log(req.body.object);
    const userId= req.email.toString();
    console.log(userId);
    console.log(interest.user);
    if(userId !== interest.user){
        return res.send({
            'status': 401,
            'message': 'Thí chú không có quyền. Vui lòng liên hệ admin nhé!'
        })
    }
    interest.save()
        .then(() => {
            if(req.body.object.objectType==='2'){
                Recipe.findOne({_id: id}, function (err, recipe) {
                    if (err && recipe == null) {
                        console.log(err);
                        return res.send({
                            'status': 401,
                            'message': 'recipe not found'
                        })
                    } else {
                        recipe.totalPoint++;
                        recipe.save((function (err) {
                            if (err) {
                                console.log(err);
                                return res.send({
                                    status: 401,
                                    message: "Error"
                                });
                            } else {
                                Users.findOne({email:interest.user}, function (err, userSchema) {
                                    if (err) {
                                        return res.send({
                                            status: 401,
                                            message: "Error"
                                        });
                                    }
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
                                                    recipe: recipe,
                                                    status: 200,
                                                    message: "like công thức thành công"
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

                            }
                        }));
                    }
                })
            }else{
                Gallery.findOne({_id: id}, function (err, gallery) {
                    if (err && gallery == null) {
                        console.log(err);
                        return res.send({
                            'status': 401,
                            'message': 'recipe not found'
                        })
                    } else {
                        gallery.totalPoint++;
                        gallery.save((function (err) {
                            if (err) {
                                console.log(err);
                                return res.send({
                                    status: 401,
                                    message: "Error"
                                });
                            } else {
                                return res.send({
                                    recipe: gallery,
                                    status: 200,
                                    message: "like bộ sưu tập thành công"
                                });
                            }
                        }));
                    }
                })
            }

        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
};
exports.deleteInterest = (auth.optional,
    (req, res) => {
        const interest = new Interests({
            user: req.body.object.user,
            objectId: req.body.object.objectId,
            objectType: req.body.object.objectType
        });
        const mongoose = require('mongoose');
        let id = mongoose.Types.ObjectId(req.body.object.objectId._id);
        console.log(req.body.object);

        const userId= req.email.toString();
        console.log(userId);
        console.log(interest.user);
        if(userId !== interest.user){
            return res.send({
                'status': 401,
                'message': 'Thí chú không có quyền. Vui lòng liên hệ admin nhé!'
            })
        }
        Interests.find({user: interest.user})
            .then((interests) => {
                if (!interests) {
                    return res.status(400).send({
                        message: "can not found current user"
                    });
                }
                for (let interested of interests) {
                    if (interest.objectId._id === interested.objectId._id) {

                        Interests.deleteOne({_id: interested._id}, function (err, result) {
                            if (err) {
                                console.log(err);
                                return res.send({
                                    status: 401,
                                    message: "lỗi xóa lượt ưu thích"
                                });
                            }
                            console.log(result);
                            if(req.body.object.objectType==='2'){
                                Recipe.findOne({_id: id}, function (err, recipe) {
                                    if (err && recipe == null) {
                                        console.log(err);

                                    } else {
										if(recipe.totalPoint > 0){
											recipe.totalPoint = recipe.totalPoint - 1;
										}
                                        recipe.save((function (err) {
                                            if (err) {
                                                console.log(err);
                                            }
                                            Users.findOne({email: interest.user}, function (err, userSchema) {
                                                if (err) {
                                                    console.log(err);

                                                }
                                                if (userSchema) {
                                                    console.log(userSchema.totalPoint);
                                                    if (userSchema.totalPoint !== undefined) {
                                                        if (parseInt(userSchema.totalPoint) > 0) {
                                                            userSchema.totalPoint--;
                                                            console.log(userSchema.totalPoint);
                                                        } else {
                                                            console.log('hết điểm để trù rồi bạn ạ');
                                                        }
                                                        userSchema.save((function (err) {
                                                            if (err) {
                                                                console.log(err);

                                                            } else {
                                                                console.log('Trừ điểm thành cồng');
                                                            }
                                                        }))
                                                    }
                                                }
                                            });
                                        }));
                                    }
                                })

                            }else{
                                Gallery.findOne({_id: id}, function (err, gallery) {
                                    if (err && gallery == null) {
                                        console.log(err);
                                        return res.send({
                                            'status': 401,
                                            'message': 'recipe not found'
                                        })
                                    } else {
										if(gallery.totalPoint>0){
                                        gallery.totalPoint--;
										}
                                        gallery.save((function (err) {
                                            if (err) {
                                                console.log(err);
                                                return res.send({
                                                    status: 401,
                                                    message: "Error"
                                                });
                                            }
                                            Users.findOne({email: interest.user}, function (err, userSchema) {
                                                if (err) {
                                                    console.log(err);

                                                }
                                                if (userSchema) {
                                                    console.log(userSchema.totalPoint);
                                                    if (userSchema.totalPoint !== undefined) {
                                                        if (parseInt(userSchema.totalPoint) > 0) {
                                                            userSchema.totalPoint--;
                                                            console.log(userSchema.totalPoint);
                                                        } else {
                                                            console.log('Hết điểm để trừ rồi bạn ạ');
                                                        }
                                                        userSchema.save((function (err) {
                                                            if (err) {
                                                                console.log(err);

                                                            } else {
                                                                console.log('Trừ điểm thành cồng');
                                                            }
                                                        }))
                                                    }
                                                }
                                            });
                                        }));
                                    }
                                })
                            }
                        });
                    }
                }
                return res.send({
                    result: 'true',
                    status: 200,
                    message: "xóa điểm thành công"
                });
            });
    });
