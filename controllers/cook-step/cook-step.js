const mongoose = require('mongoose');

const CookStep = mongoose.model('CookSteps');
exports.getCookStep= (async (req, res) => {
    await CookStep.find({})
        .sort({
            createAt: 1
        })
        .limit(100)
        .then(cookSteps => {
            res.status(200).send(cookSteps
            )
        }).catch(err => {
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding cookStep'
            })
        })
});

exports.findCookStep = async (req, res) => {
    await CookStep.findOne({cookStepName: req.body.cookStepName}, function (err, cookStep) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'cookStep not found'
            })
        } else {
            res.send({
                'status': 200,
                cookStep: cookStep
            })
        }
    })
};
exports.createCookStep = (req, res) => {
    const cookStep = new CookStep({
        name: req.body.cookStep.name,
        time: req.body.cookStep.time,
        psnote: req.body.cookStep.psnote,
        image: req.body.cookStep.image,
        check: req.body.cookStep.image,
        description: req.body.cookStep.image,

    });

    cookStep.save()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
};

exports.createMultipleCookStep = (req, res) => {
    console.log(req.body.cookSteps);
    CookStep.insertMany(req.body.cookSteps, function (err, cookSteps) {
        if (err) {
            res.status(500).send({
                message: 'Luu multiple that bai'
            });
            console.log(err);
        } else{
            res.status(200).send(
                cookSteps
            )
        }
    });
};
