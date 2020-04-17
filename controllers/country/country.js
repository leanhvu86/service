const mongoose = require('mongoose');

const Country = mongoose.model('Countrys');
exports.getCountrys = (async (req, res) => {
    // try {
    //     const countrys = country.find({}, '-_id');
    //     console.log('danh sach tinh tp' + countrys);
    //     res.send({
    //         'status': 200,
    //         countrys: countrys
    //     })
    // } catch (err) {
    //     console.log('not found country');
    //     res.send({
    //         "status": 404,
    //         'type': 'ERROR_DATA',
    //         'message': 'countrys not  found'
    //     })
    // }
    await Country.find
        // ({}, function(err, countrys) {
        //     console.log(countrys);
        //     if (countrys.length===0){
        //         res.status(404).send(
        //             {
        //                 'status':404,
        //                 'message':err||'can not find countrys'
        //             }
        //         )
        //     }else {
        //         res.status(200).send(countrys);
        //     }
        // });
        ()
        .then(countrys => {
            res.status(200).send(countrys
            )
        }).catch(err => {
            console.log('not found country');
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding country'
            })
        })
});

exports.findCountry = async (req, res) => {
    console.log(req.body.countryName);
    await Country.findOne({countryName: req.body.countryName}, function (err, country) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'country not found'
            })
        } else {
            res.send({
                'status': 200,
                country: country
            })
        }
    })
};
exports.createCountry = (req, res) => {
    const country = new Country({
        countryCode: req.body.countryCode,
        countryName: req.body.countryName,
        status: 1
    });

    country.save()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
};

exports.createMultiple = (req, res) => {
    console.log(req.body.countrys);
    Country.insertMany(req.body.countrys, function (err) {
        if (err) {
            res.status(500).send({
                message: 'Luu multiple that bai'
            });
            console.log(err);
        } else{
            res.status(200).send({
                message:'Luu Multiple thanh cong'
            });
            console.log("countrys Added Successfully");
        }
    });
};
