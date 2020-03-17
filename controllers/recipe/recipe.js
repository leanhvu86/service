const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipes');
const Users = mongoose.model("Users");
exports.getRecipes = (async (req, res, next) => {
    console.log(req.header)
    await Recipe.find
        ({
            status: 1
        })
        .then(recipes => {
            res.status(200).send(recipes
            )
        }).catch(err => {
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding recipe'
            })
        })
});
exports.getAllRecipes = (async (req, res, next) => {
    console.log(req.header)
    await Recipe.find

        ()
        .then(recipes => {
            res.status(200).send(recipes
            )
        }).catch(err => {
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding recipe'
            })
        })
});
exports.findRecipe = async (req, res, next) => {
    console.log('helo' + req.params.id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.params.id);
    await Recipe.findOne({_id: id}, function (err, recipe) {
        if (err || recipe === null) {
            console.log(recipe)
            return res.send({
                'status': 401,
                'message': 'recipe not found'
            })
        } else {
            console.log(recipe)
            Users.findOne({email: recipe.user.email}, function (err, userSchema) {
                if (err) {
                    console.log(err)
                    return res.send({
                        status: 401,
                        message: err
                    });
                }
                if (userSchema) {
                    console.log(userSchema)
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
                                status:200,
                                recipe:recipe
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
}


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
    })
    console.log(req.body.recipe.cockStep)
    console.log(req.body.cockStep)
    const user = req.body.recipe.user;
    Users.findOne({email:user}, function (err, userSchema) {
        if (err) {
            return res.send({
                status: 401,
                message: err
            });
        }
        if (userSchema) {

            userSchema.totalPoint=userSchema.totalPoint +2;
            userSchema.save().then(data =>{
                recipe.user = userSchema;
                recipe.save()
                    .then(data => {
                        res.status(200).send({
                            data: data,
                            message: 'Chúc mừng bạn đã thêm mới công thức thành công!'
                        })
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message || 'Some error occurred while creating the note'
                    })
                })
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the note'
                })
            })

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
        })
    })

}
exports.acceptRecipe = async (req, res, next) => {
    console.log('helo' + req.body.recipe._id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.recipe._id);
    await Recipe.findOne({_id: id}, function (err, recipe) {
        if (err || recipe === null) {
            console.log(recipe)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            console.log(recipe)
            recipe.status=1;
            recipe.save((function (err) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    return res.status(200).send({
                        status:200,
                        message:'Bạn đã duyệt công thức thành công',
                        recipe:recipe
                    });
                }
            }));
        }
    })
}
exports.declineRecipe = async (req, res, next) => {
    console.log('helo' + req.body.recipe._id)
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.body.recipe._id);
    await Recipe.findOne({_id: id}, function (err, recipe) {
        if (err || recipe === null) {
            console.log(recipe)
            return res.send({
                'status': 401,
                'message': 'user not found'
            })
        } else {
            console.log(recipe)
            recipe.status=-1;
            recipe.save((function (err) {
                if (err) {
                    return res.send({
                        status: 401,
                        message: "Error"
                    });
                } else {
                    return res.status(200).send({
                        status:200,
                        message:'Bạn đã từ chối công thức này',
                        recipe:recipe
                    });
                }
            }));
        }
    })
}
exports.createMultiple = (req, res) => {
    Recipe.insertMany(req.body.recipes, function (err, recipes) {
        if (err) {
            res.status(500).send({
                message: 'Luu multiple that bai'
            })
        } else {
            res.status(200).send({
                message: 'Luu Multiple thanh cong',
                recipes: recipes
            })
        }
    });
}
