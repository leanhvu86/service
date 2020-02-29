const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipes');
exports.getRecipes = (async (req, res, next) => {
    // try {
    //     const recipes = recipe.find({}, '-_id');
    //     console.log('danh sach tinh tp' + recipes);
    //     res.send({
    //         'status': 200,
    //         recipes: recipes
    //     })
    // } catch (err) {
    //     console.log('not found recipe');
    //     res.send({
    //         "status": 404,
    //         'type': 'ERROR_DATA',
    //         'message': 'recipes not  found'
    //     })
    // }
    await Recipe.find
        // ({}, function(err, recipes) {
        //     console.log(recipes);
        //     if (recipes.length===0){
        //         res.status(404).send(
        //             {
        //                 'status':404,
        //                 'message':err||'can not find recipes'
        //             }
        //         )
        //     }else {
        //         res.status(200).send(recipes);
        //     }
        // });
        ()
        .then(recipes => {
            console.log('tìm provice' + recipes);
            res.status(200).send(recipes
            )
        }).catch(err => {
            console.log('not found recipe');
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding recipe'
            })
        })
});

exports.findRecipe = async (req, res, next) => {
    console.log(req.body.recipeName)
    await Recipe.findOne({recipeName: req.body.recipeName}, function (err, recipe) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'recipe not found'
            })
        } else {
            res.send({
                'status': 200,
                recipe: recipe
            })
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
        ingredients:req.body.recipe.ingredients,
        ingredientsGroup:req.body.recipe.ingredientsGroup,
        cockStep:req.body.recipe.cockStep,
        country:req.body.recipe.country,
        foodType:req.body.recipe.foodType,
        cookWay:req.body.recipe.cookWay,
    })
    console.log(recipe);
    recipe.save()
        .then(data => {
            res.status(200).send({
                data:data,
                message:'Chúc mừng bạn đã thêm mới công thức thành công!'
            })
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
}

exports.createMultiple = (req, res) => {
    console.log(req.body.recipes)
    Recipe.insertMany(req.body.recipes, function (err, recipes) {
        if (err) {
            res.status(500).send({
                message: 'Luu multiple that bai'
            })
            console.log(err);
        } else{
            res.status(200).send({
                message:'Luu Multiple thanh cong',
                recipes:recipes
            })
            console.log("recipes Added Successfully");
        }
    });
}
