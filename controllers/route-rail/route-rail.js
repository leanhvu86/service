const mongoose = require('mongoose');

const RouteRails = mongoose.model('RouteRails');
exports.getRouteRails= (async (req, res, next) => {
    // try {
    //     const provinces = Province.find({}, '-_id');
    //     console.log('danh sach tinh tp' + provinces);
    //     res.send({
    //         'status': 200,
    //         provinces: provinces
    //     })
    // } catch (err) {
    //     console.log('not found province');
    //     res.send({
    //         "status": 404,
    //         'type': 'ERROR_DATA',
    //         'message': 'provinces not  found'
    //     })
    // }
    await RouteRails.find
        // ({}, function(err, provinces) {
        //     console.log(provinces);
        //     if (provinces.length===0){
        //         res.status(404).send(
        //             {
        //                 'status':404,
        //                 'message':err||'can not find provinces'
        //             }
        //         )
        //     }else {
        //         res.status(200).send(provinces);
        //     }
        // });
        ()
        .then(routeRails => {
            console.log('tìm RouteRails' + routeRails);
            res.status(200).send(routeRails
            )
        }).catch(err => {
            console.log('not found RouteRails');
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding RouteRails'
            })
        })
});

exports.findRouteRails = async (req, res, next) => {
    await RouteRails.findOne({nameRoute: req.body.nameRoute}, function (err, routeRails) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'RouteRails not found'
            })
        } else {
            res.send({
                'status': 200,
                province: routeRails
            })
        }
    })
}
exports.create = (req, res) => {
    const routeRails = new RouteRails({
        routeId: req.body.routeId,
        nameRoute: req.body.nameRoute,
        description : req.body.description,
        status: 1
    })
    console.log(routeRails+'save routerail')
    routeRails.save()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the route rail'
        })
    })
}

exports.createMultiple = (req, res) => {
    console.log(req.body.routeRails)
    RouteRails.insertMany(req.body.routeRails, function (err, routeRails) {
        if (err) {
            res.status(500).send({
                message: 'Luu RouteRails that bai'
            })
            console.log(err);
        } else{
            res.status(200).send({
                message:'Luu RouteRails thanh cong'
            })
            console.log("RouteRails Added Successfully");
        }
    });
}
