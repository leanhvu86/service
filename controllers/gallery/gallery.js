const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Gallerys = mongoose.model('Gallerys');
const Recipe = mongoose.model('Recipes');
const Users = mongoose.model("Users");
exports.getGallerys = (async (req, res, next) => {

    await Gallerys.find()
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

    await Gallerys.find()
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
    console.log(req.body.gallery)
    Gallerys.find({user: req.body.gallery.email}, function (err, gallerys) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'gallery not found'
            })
        } else {
            res.status(200).send({gallerys: gallerys}
            )
        }
    })
}
exports.addGallery = (req, res) => {
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.gallery._id);
    Gallerys.findOne({_id: id}, function (err, gallery) {
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
exports.createGallery = (req, res) => {

    Users.findOne({email: req.body.gallery.user}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        console.log("UserName: " + userSchema.email);
        if (userSchema) {
            gallery.user = userSchema.email
        } else {
            return res.send({
                status: 403,
                message: err
            });
        }
    });
    gallery.save()
        .then(data => {
            return res.send({
                gallery: gallery,
                status: 200,
                message: "Thêm bộ sưu tập thành công"
            });
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the gallery'
        })
    })
}
exports.deleteGallery = (auth.optional,
    (req, res, next) => {

        var mongoose = require('mongoose');
        var id = mongoose.Types.ObjectId(req.body.gallery._id);
        Gallerys.find({id: id})
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
