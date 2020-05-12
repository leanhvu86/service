const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Gallery = mongoose.model('Gallerys');
const Users = mongoose.model("Users");
const Summary = mongoose.model('Summarys');
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
    console.log(req.body);
    var id = mongoose.Types.ObjectId(req.body.gallery._id);
    Gallery.findOne({_id: id}, function (err, gallery) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        const userId = req.email.toString();
        console.log(userId);
        console.log(gallery.user.email);
        if (userId !== gallery.user.email) {
            return res.send({
                'status': 401,
                'message': 'Thí chú không có quyền. Vui lòng liên hệ admin nhé!'
            })
        }
        let recipeArray = gallery.recipe;
        let recipe = req.body.gallery.recipe;
        let check = false;
        recipeArray.forEach(reTemp => {
            if (reTemp.recipeName === recipe.recipeName && reTemp.user.email === recipe.user.email) {
                console.log(reTemp.recipeName);
                if (check === false) {
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

        console.log(gallery.name);
        const userId = req.email;
        console.log(gallery.user._id.toString);
        if (userId !== gallery.user.email) {
            return res.send({
                'status': 401,
                'message': 'Thí chú không có quyền. Vui lòng liên hệ admin nhé!'
            })
        }
        if (req.body.gallery.name === '' || req.body.gallery.content === '') {
            return res.send({
                status: 404,
                message: 'Vui lòng kiểm tra thông tin các trường'
            });
        }
        gallery.name = req.body.gallery.name;
        gallery.content = req.body.gallery.content;
        gallery.recipe = req.body.gallery.recipes;


        gallery.save()
            .then(data => {
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
    if (gallery.user === '' || gallery.name === '' || gallery.content === '' || gallery.image === '') {
        return res.send({
            status: 404,
            message: 'Vui lòng kiểm tra thông tin các trường'
        });
    }
    const userId = req.email.toString();
    console.log(userId);
    console.log(gallery.user);
    if (userId !== gallery.user) {
        return res.send({
            'status': 401,
            'message': 'Thí chú không có quyền. Vui lòng liên hệ admin nhé!'
        })
    }
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
                    userSchema.totalPoint++;
                    userSchema.save().then(()=>{
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
                    }).catch(err=>{
                        res.status(500).send({
                            message: err.message || 'Some error occurred while creating the gallery'
                        });
                    });
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
        console.log(req.body.gallery._id)
        const id = mongoose.Types.ObjectId(req.body.gallery._id);
        Gallery.findOne({_id: id})
            .then((data) => {
                if (!data) {
                    return res.status(400).send({
                        message: "Bộ sưu tập không tồn  tại"
                    });
                }
               /* const userId = req.userId;
                console.log(userId);
                console.log(data);
                if (userId !== data.user._id) {
                    return res.send({
                         status: 401,
                        'message': 'Thí chú không có quyền. Vui lòng liên hệ admin nhé!'
                    });
                }*/
                Gallery.deleteOne({_id: id}, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send({
                            status: 401,
                            message: "Lỗi xóa bộ sưu tập"
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
                                            message: "Xóa bộ sưu tập thành công"
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
