const mongoose = require('mongoose');

const CookWay = mongoose.model('CookWays');
exports.getCookWays = (async (req, res) => {
    // try {
    //     const cookWays = cookWay.find({}, '-_id');
    //     console.log('danh sach tinh tp' + cookWays);
    //     res.send({
    //         'status': 200,
    //         cookWays: cookWays
    //     })
    // } catch (err) {
    //     console.log('not found cookWay');
    //     res.send({
    //         "status": 404,
    //         'type': 'ERROR_DATA',
    //         'message': 'cookWays not  found'
    //     })
    // }
    await CookWay.find
        // ({}, function(err, cookWays) {
        //     console.log(cookWays);
        //     if (cookWays.length===0){
        //         res.status(404).send(
        //             {
        //                 'status':404,
        //                 'message':err||'can not find cookWays'
        //             }
        //         )
        //     }else {
        //         res.status(200).send(cookWays);
        //     }
        // });
        ()
        .then(cookWays => {
            res.status(200).send(cookWays
            )
        }).catch(err => {
            console.log('not found cookWay');
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding cookWay'
            })
        })
});

exports.findCookWay = async (req, res) => {
    console.log(req.body.cookWayName);
    await CookWay.findOne({cookWayName: req.body.cookWayName}, function (err, cookWay) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'cookWay not found'
            })
        } else {
            res.send({
                'status': 200,
                cookWay: cookWay
            });
        }
    });
};
exports.createCookWay = (req, res) => {
    const cookWay = new CookWay({
        cookWayCode: req.body.cookWayCode,
        cookWayName: req.body.cookWayName,
        status: 1
    });

    cookWay.save()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
};

exports.createMultiple = (req, res) => {
    CookWay.insertMany(req.body.cookWays, function (err, cookWays) {
        if (err) {
            res.status(500).send({
                message: 'Luu multiple that bai'
            });
            console.log(err);
        } else{
            res.status(200).send({
                message:'Luu Multiple thanh cong',
                cookWays:cookWays
            });
            console.log("cookWays Added Successfully");
        }
    });
};
