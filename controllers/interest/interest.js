const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Interests = mongoose.model('Interests');
const Recipe = mongoose.model('Recipes');
const Gallery = mongoose.model('Gallerys');
exports.getInterests = (async (req, res, next) => {

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

exports.findInterest = async (req, res, next) => {
    console.log(req.body)
    await Interests.find({user: req.body.user.email}, function (err, interests) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'interest not found'
            })
        } else {
            console.log(interests)
            res.status(200).send({interests:interests}
            )
        }
    })
}
exports.findInterestGallery = async (req, res, next) => {
    console.log(req.body)
    await Interests.find({user: req.body.user.email, objectType: "2"}, function (err, interests) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'interest not found'
            })
        } else {
            console.log(interests)
            res.status(200).send({interests:interests}
            )
        }
    })
}
exports.createInterest = (req, res) => {
    const interest = new Interests({
        user: req.body.object.user,
        objectId: req.body.object.objectId,
        objectType: req.body.object.objectType
    })
    var mongoose = require('mongoose');
    let id = mongoose.Types.ObjectId(req.body.object.objectId._id);
    console.log(req.body.object)
    interest.save()
        .then(data => {
            if(req.body.object.objectType=='2'){
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
                                return res.send({
                                    recipe: recipe,
                                    status: 200,
                                    message: "like công thức thành công"
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
}
exports.deleteInterest = (auth.optional,
    (req, res, next) => {
        const interest = new Interests({
            user: req.body.object.user,
            objectId: req.body.object.objectId,
            objectType: req.body.object.objectType
        })
        var mongoose = require('mongoose');
        let id = mongoose.Types.ObjectId(req.body.object.objectId._id);
        console.log(req.body.object)
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
                            if(req.body.object.objectType==='2'){
                                Recipe.findOne({_id: id}, function (err, recipe) {
                                    if (err && recipe == null) {
                                        console.log(err);
                                        return res.send({
                                            'status': 401,
                                            'message': 'recipe not found'
                                        })
                                    } else {
                                        recipe.totalPoint = recipe.totalPoint - 1;
                                        recipe.save((function (err) {
                                            if (err) {
                                                return res.send({
                                                    status: 401,
                                                    message: "Error"
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
                                        gallery.totalPoint--;
                                        gallery.save((function (err) {
                                            if (err) {
                                                console.log(err);
                                                return res.send({
                                                    status: 401,
                                                    message: "Error"
                                                });
                                            }
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
