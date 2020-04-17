const mongoose = require('mongoose');

const FoodType = mongoose.model('FoodTypes');
exports.getFoodTypes = (async (req, res) => {
    // try {
    //     const foodTypes = foodType.find({}, '-_id');
    //     console.log('danh sach tinh tp' + foodTypes);
    //     res.send({
    //         'status': 200,
    //         foodTypes: foodTypes
    //     })
    // } catch (err) {
    //     console.log('not found foodType');
    //     res.send({
    //         "status": 404,
    //         'type': 'ERROR_DATA',
    //         'message': 'foodTypes not  found'
    //     })
    // }
    await FoodType.find
        // ({}, function(err, foodTypes) {
        //     console.log(foodTypes);
        //     if (foodTypes.length===0){
        //         res.status(404).send(
        //             {
        //                 'status':404,
        //                 'message':err||'can not find foodTypes'
        //             }
        //         )
        //     }else {
        //         res.status(200).send(foodTypes);
        //     }
        // });
        ()
        .then(foodTypes => {
            res.status(200).send(foodTypes
            )
        }).catch(err => {
            console.log('not found foodType');
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding foodType'
            })
        })
});

exports.findFoodType = async (req, res) => {
    console.log(req.body.foodTypeName);
    await FoodType.findOne({foodTypeName: req.body.foodTypeName}, function (err, foodType) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'foodType not found'
            })
        } else {
            res.send({
                'status': 200,
                foodType: foodType
            })
        }
    });
};
exports.createFoodType = (req, res) => {
    const foodType = new FoodType({
        foodTypeCode: req.body.foodTypeCode,
        foodTypeName: req.body.foodTypeName,
        status: 1
    });

    foodType.save()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the foodType'
        })
    })
};

exports.createMultiple = (req, res) => {
    console.log(req.body.foodTypes);
    FoodType.insertMany(req.body.foodTypes, function (err, foodTypes) {
        if (err) {
            res.status(500).send({
                message: 'Luu multiple that bai'
            });
            console.log(err);
        } else{
            res.status(200).send({
                message:'Luu Multiple thanh cong',
                foodTypes:foodTypes
            });
            console.log("foodTypes Added Successfully");
        }
    });
};
