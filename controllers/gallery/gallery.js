const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Gallery = mongoose.model('Gallerys');
const Recipe = mongoose.model('Recipes');
const Users = mongoose.model("Users");
const Summarys = mongoose.model('Summarys');
exports.getGallerys = (async (req, res, next) => {

    await Gallery.find()
        .then(gallerys => {
            res.status(200).send(gallerys
            )
        }).catch(err => {
            console.log(err);
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding gallery'
            })
        })
});
exports.getTopGallerys = (async (req, res, next) => {

    await Gallery.find()
        .sort({totalPoint: -1})
        .limit(4)
        .then(gallerys => {
            res.status(200).send(gallerys
            )
        }).catch(err => {
            console.log(err);
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding gallery'
            })
        })
});
exports.findGallery = async (req, res, next) => {
    Users.findOne({email: req.body.gallery.email}, function (err, userSchema) {
        if (userSchema) {
            Gallery.find()
                .then(gallerys => {
                    gallerys = gallerys.filter(
                        gallery => gallery.user._id === userSchema._id);
                    res.status(200).send({gallerys: gallerys}
                    )
                }).catch(err => {
                console.log(err);
                res.send({
                    'status': 404,
                    'message': err.message || 'Some error occurred while finding gallery'
                })
            })
        } else {
            return res.send({
                status: 403,
                message: err
            });
        }
    });

}
exports.addGallery = (req, res) => {
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.gallery._id);
    Gallery.findOne({_id: id}, function (err, gallery) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        let recipeArray = gallery.recipe
        let recipe = req.body.gallery.recipe
        recipeArray.push(recipe)
        gallery.save()
            .then(data => {
                return res.send({
                    gallery: gallery,
                    status: 200,
                    message: "Thêm công thức vào bộ sưu tập thành công"
                });
            }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the gallery'
            })
        })
    });
}
exports.galleryDetail = (req, res) => {
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.params.id);
    Gallery.findOne({_id: id}, function (err, gallery) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        return res.send({
            gallery: gallery,
            status: 200
        });
    })
}
exports.createGallery = (req, res) => {
    const gallery = new Gallery({
        user: req.body.gallery.user,
        name: req.body.gallery.name,
        content: req.body.gallery.content,
        image: req.body.gallery.image
    })
    Users.findOne({email: req.body.gallery.user}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        if (userSchema) {
            gallery.user = userSchema
            gallery.save()
                .then(data => {
                    Summarys.find()
                        .then(summary => {
                            let sum=summary[0]
                            console.log(sum)
                            sum.galleryCount++;
                            sum.save()
                                .then(data => {
                                    return res.send({
                                        summary:data,
                                        gallery: gallery,
                                        status: 200,
                                        message: "Thêm bộ sưu tập thành công"
                                    });
                                }).catch(err => {
                                res.status(500).send({
                                    message: err.message || 'Some error occurred while creating the gallery'
                                })
                            })
                        }).catch(err => {
                        console.log(err);
                        res.send({
                            'status': 404,
                            'message': err.message || 'Some error occurred while finding summary'
                        })
                    })
                }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the gallery'
                })
            })
        } else {
            return res.send({
                status: 403,
                message: err
            });
        }
    });
}
exports.deleteGallery = (auth.optional,
    (req, res, next) => {

        var mongoose = require('mongoose');
        var id = mongoose.Types.ObjectId(req.body.gallery._id);
        Gallery.find({id: id})
            .then((gallerys) => {
                if (!gallerys) {
                    return res.status(400).send({
                        message: "Bộ sưu tập không tồn  tại"
                    });
                }
                Gallerys.deleteOne({_id: id}, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send({
                            status: 401,
                            message: "lỗi xóa bộ sưu tập"
                        });
                    } else {
                        return res.send({
                            status: 200,
                            message: "xóa bộ sưu tập thành công"
                        });
                    }
                });
            });
    });
