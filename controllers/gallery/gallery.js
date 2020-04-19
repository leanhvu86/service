const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Gallery = mongoose.model('Gallerys');
const Users = mongoose.model("Users");
const Summary= mongoose.model('Summarys');
exports.getGallerys = (async (req, res) => {

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
exports.getTopGallerys = (async (req, res) => {

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
exports.findGallery = async (req, res) => {
    Users.findOne({email: req.body.gallery.email}, function (err, userSchema) {
        if (!userSchema) {
            return res.send({
                status: 403,
                message: err
            });
        } else {
            Gallery.find()
                .then(gallerys => {
                    gallerys = gallerys.filter(
                        gallery => gallery.user.email === userSchema.email);
                    res.status(200).send({gallerys: gallerys}
                    )
                }).catch(err => {
                console.log(err);
                res.send({
                    'status': 404,
                    'message': err.message || 'Some error occurred while finding gallery'
                })
            })
        }
    });

};
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
        let recipeArray = gallery.recipe;
        let recipe = req.body.gallery.recipe;
        let check = false;
        recipeArray.forEach(reTemp => {
            if (reTemp.recipeName === recipe.recipeName && reTemp.user.email === recipe.user.email) {
                if(check===false){
                    check = true;
                    return res.send({
                        status: 401,
                        message: 'Công thức của bạn đã có trong bộ sưu tập rồi! Vui lòng chọn bộ sưu tập khác'
                    });
                }
            }
        });
        if (check === false) {
            recipeArray.push(recipe);
            gallery.save()
                .then(() => {
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
        }
    });
};
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
    });
};
exports.updateGallery = (req, res) => {
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.gallery._id);
    Gallery.findOne({_id: id}, function (err, gallery) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        gallery.name=req.body.gallery.name;
        gallery.content=req.body.gallery.content;
        gallery.recipe=req.body.gallery.recipes;
        gallery.save()
            .then(data=>{
                return res.send({
                    gallery: data,
                    status: 200
                });
            })
    });
};
exports.createGallery = (req, res) => {
    const gallery = new Gallery({
        user: req.body.gallery.user,
        name: req.body.gallery.name,
        content: req.body.gallery.content,
        image: req.body.gallery.image
    });
    Users.findOne({email: req.body.gallery.user}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        if (userSchema) {
            gallery.user = userSchema;
            gallery.save()
                .then(() => {
                    Summary.find()
                        .then(summary => {
                            let sum = summary[0];
                            sum.galleryCount++;
                            sum.save()
                                .then(data => {
                                    return res.send({
                                        summary: data,
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
                });
            });
        } else {
            return res.send({
                status: 403,
                message: err
            });
        }
    });
};
exports.deleteGallery = (auth.optional,
    (req, res) => {
    console.log(req.body.gallery.id)
        const id = mongoose.Types.ObjectId(req.body.gallery.id);
        Gallery.find({id: id})
            .then((gallerys) => {
                if (!gallerys) {
                    return res.status(400).send({
                        message: "Bộ sưu tập không tồn  tại"
                    });
                }
                Gallery.deleteOne({_id: id}, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send({
                            status: 401,
                            message: "lỗi xóa bộ sưu tập"
                        });
                    } else {
                        Summary.find()
                            .then(summary => {
                                let sum = summary[0];
                                sum.galleryCount--;
                                sum.save()
                                    .then(() => {
                                        return res.send({
                                            status: 200,
                                            message: "xóa bộ sưu tập thành công"
                                        });
                                    }).catch(err => {
                                    console.log(err)
                                })
                            }).catch(err => {
                            console.log(err);

                        })
                    }
                });
            });
    });
