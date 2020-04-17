const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Ingredients = mongoose.model('Ingredients');
exports.getIngredients = (async (req, res) => {
    // try {
    //     const ingredients = ingredient.find({}, '-_id');
    //     console.log('danh sach tinh tp' + ingredients);
    //     res.send({
    //         'status': 200,
    //         ingredients: ingredients
    //     })
    // } catch (err) {
    //     console.log('not found ingredient');
    //     res.send({
    //         "status": 404,
    //         'type': 'ERROR_DATA',
    //         'message': 'ingredients not  found'
    //     })
    // }
    await Ingredients.find
        // ({}, function(err, ingredients) {
        //     console.log(ingredients);
        //     if (ingredients.length===0){
        //         res.status(404).send(
        //             {
        //                 'status':404,
        //                 'message':err||'can not find ingredients'
        //             }
        //         )
        //     }else {
        //         res.status(200).send(ingredients);
        //     }
        // });
        ()
        .then(ingredients => {
            res.status(200).send(ingredients
            )
        }).catch(err => {
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding ingredient'
            })
        })
});

exports.findIngredient = async (req, res) => {
    console.log(req.body.user);
    await Ingredient.findOne({user: req.body.user}, function (err, ingredients) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'ingredient not found'
            })
        } else {
            res.send({
                'status': 200,
                ingredient: ingredients
            })
        }
    });
};
exports.createIngredient = (req, res) => {
    const ingredient = new Ingredients({
        quantitative: req.body.ingredient.quantitative,
        typeOfquantitative: req.body.ingredient.typeOfquantitative,
        ingredientName: req.body.ingredient.ingredientName,
        note: req.body.ingredient.note
    });

    ingredient.save()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
};
exports.deleteIngredient = (auth.optional,
    (req, res) => {
        const ingredient = new Ingredients({
            _id: req.body.ingredient._id,
            quantitative: req.body.ingredient.quantitative,
            typeOfquantitative: req.body.ingredient.typeOfquantitative,
            ingredientName: req.body.ingredient.ingredientName,
            note: req.body.ingredient.note
        });
        Ingredients.deleteOne({_id: ingredient._id}, function (err, result) {

            if (err) {

                return res.send({
                    status: 401,
                    message: "lỗi xóa lượt ưu thích"
                });
            } else {
                console.log(result);
                return res.send({
                    status: 200,
                    message: "Xóa lượt ưu thích thành công"
                });
            }
        });
    });
