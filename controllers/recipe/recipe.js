const mongoose = require('mongoose');
const Summarys = mongoose.model('Summarys');
const Recipe = mongoose.model('Recipes');
const Users = mongoose.model("Users");
const Messages = mongoose.model('Messages');
exports.getRecipes = (async (req, res) => {
    await Recipe.find
    ({
        status: 1
    })
        .then(recipes => {
            res.status(200).send(recipes
            );
        }).catch(err => {
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding recipe'
            })
        })
});
exports.getNewRecipes = (async (req, res) => {
    await Recipe.find({
        status: 0
    })
        .sort({
            createdAt: -1
        })
        .limit(10).then(recipes => {
            res.status(200).send(recipes
            );
        }).catch(err => {
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding recipe'
            });
        });
});
exports.getAllRecipes = (async (req, res) => {
    await Recipe.find()
        .sort({totalPoint: 1})
        .limit(100)
        .then(recipes => {
            res.status(200).send(recipes
            );
        }).catch(err => {
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding recipe'
            });
        });
});
exports.findRecipe = async (req, res) => {
   /* const mongoose = require('mongoose');
    const id = mongoose.Types.ObjectId(req.params.id);*/
    let nameSpace= req.params.id;
    console.log(nameSpace);
    await Recipe.findOne({nameSpace: nameSpace}, function (err, recipe) {
        if (err || recipe === null) {
            return res.send({
                'status': 401,
                'message': 'recipe not found'
            });
        } else {
            Users.findOne({email: recipe.user.email}, function (err, userSchema) {
                if (err) {
                    console.log(err);
                    return res.send({
                        status: 401,
                        message: err
                    });
                }
                if (userSchema) {
                    recipe.user = userSchema;
                    recipe.viewCount++;
                    recipe.save((function (err) {
                        if (err) {
                            return res.send({
                                status: 401,
                                message: "Error"
                            });
                        } else {
                            return res.status(200).send({
                                status: 200,
                                recipe: recipe
                            });
                        }
                    }));
                } else {
                    return res.send({
                        status: 403,
                        message: err
                    });
                }
            });
        }
    })
};


exports.createRecipe = (req, res) => {
    const recipe = new Recipe({
        recipeName: req.body.recipe.recipeName,
        imageUrl: req.body.recipe.imageUrl,
        content: req.body.recipe.content,
        videoLink: req.body.recipe.videoLink,
        hardLevel: req.body.recipe.hardLevel,
        time: req.body.recipe.time,
        ingredients: req.body.recipe.ingredients,
        ingredientsGroup: req.body.recipe.ingredientsGroup,
        cockStep: req.body.recipe.cockStep,
        country: req.body.recipe.country,
        foodType: req.body.recipe.foodType,
        cookWay: req.body.recipe.cookWay,
        nameSpace:req.body.recipe.nameSpace
    });
    const user = req.body.recipe.user;
    Users.findOne({email: user}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        if (userSchema) {

            userSchema.totalPoint = userSchema.totalPoint + 2;
            userSchema.save().then(() => {
                recipe.user = userSchema;
                recipe.save()
                    .then(data => {
                        const message = new Messages({
                            user: userSchema.email,
                            imageUrl: '',
                            content: 'Chúc mừng bạn đã thêm mới công thức thành công!',
                            videoUrl: '',
                        });
                        message.save().then(() => {
                            Summarys.find()
                                .then(summary => {
                                    let sum = summary[0];
                                    console.log(sum);
                                    sum.recipeCount++;
                                    sum.save()
                                        .then(() => {
                                            res.send({
                                                status:200,
                                                data: data,
                                                message: 'Chúc mừng bạn đã thêm mới công thức thành công!'
                                            });
                                        }).catch(err => {
                                        res.send({
                                            status:200,
                                            message: 'Lỗi khi tổng kết số công thức của trang web'
                                        });
                                    });
                                }).catch(err => {
                                console.log(err);
                                res.send({
                                    'status': 404,
                                    message: 'Lỗi khi tổng kết số công thức của trang web'
                                });
                            });

                        }).catch(err => {
                            console.log('not found recipe');
                            res.send({
                                'status': 404,
                                'message': err.message || 'Some error occurred while finding recipe'
                            });
                        });
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while creating the note'
                    });
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the note'
                });
            });

        } else {
            return res.send({
                status: 403,
                message: err
            });
        }
    }).catch(err => {
        console.log('not found recipe');
        res.send({
            'status': 404,
            'message': err.message || 'Some error occurred while finding recipe'
        });
    });

};
exports.acceptRecipe = async (req, res) => {
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.recipe.recipe._id);
    await Recipe.findOne({_id: id}, function (err, recipe) {
        if (err || recipe === null) {
            return res.send({
                'status': 401,
                'message': 'user not found'
            });
        } else {
            Users.findOne({email: req.body.recipe.email}, function (err, userSchema) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: err
                    });
                }
                if (userSchema) {
                    recipe.updateUser = userSchema;
                    recipe.status = 1;
                    recipe.save((function (err) {
                        if (err) {
                            return res.send({
                                status: 401,
                                message: "Error"
                            });
                        } else {
                            const message = new Messages({
                                user: recipe.user.email,
                                imageUrl: '',
                                content: 'Chúc mừng bạn đã được duyệt công thức ' + recipe.recipeName,
                                videoUrl: '',
                            });
                            message.save().then(() => {
                                return res.status(200).send({
                                    status: 200,
                                    message: 'Bạn đã duyệt công thức thành công',
                                    recipe: recipe
                                });
                            }).catch(err => {
                                console.log('not found recipe');
                                res.send({
                                    'status': 404,
                                    'message': err.message || 'Some error occurred while finding recipe'
                                });
                            });
                        }
                    }));
                } else {
                    return res.send({
                        status: 403,
                        message: err
                    });
                }
            });
        }
    });
};
exports.declineRecipe = async (req, res) => {
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.recipe.recipe._id);
    await Recipe.findOne({_id: id}, function (err, recipe) {
        if (err || recipe === null) {
            return res.send({
                'status': 401,
                'message': 'user not found'
            });
        } else {
            Users.findOne({email: req.body.recipe.email}, function (err, userSchema) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: err
                    });
                }
                if (userSchema) {
                    recipe.updateUser = userSchema;
                    recipe.status = -1;
                    recipe.save((function (err) {
                        if (err) {
                            return res.send({
                                status: 401,
                                message: "Error"
                            });
                        } else {
                            const message = new Messages({
                                user: recipe.user.email,
                                imageUrl: '',
                                content: 'Công thức ' + recipe.recipeName + ' đã bị từ chối',
                                videoUrl: '',
                            });
                            message.save().then(() => {
                                return res.send({
                                    status: 200,
                                    message: 'Bạn đã từ chối công thức này',
                                    recipe: recipe
                                });
                            }).catch(err => {
                                console.log('not found recipe');
                                res.send({
                                    'status': 404,
                                    'message': err.message || 'Some error occurred while finding recipe'
                                });
                            });

                        }
                    }));
                } else {
                    return res.send({
                        status: 403,
                        message: 'Không tìm thấy user đăng nhập! '
                    });
                }
            });
        }
    })
};
exports.createMultiple = (req, res) => {
    Recipe.insertMany(req.body.recipes, function (err, recipes) {
        if (err) {
            res.status(500).send({
                message: 'Luu multiple that bai'
            });
        } else {
            res.status(200).send({
                message: 'Luu Multiple thanh cong',
                recipes: recipes
            });
        }
    });
};
