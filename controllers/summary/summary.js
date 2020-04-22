const mongoose = require('mongoose');
require("../../routers/auth");
const Summary = mongoose.model('Summarys');
exports.getSummarys = (async (req, res) => {

    await Summary.find()
        .then(summary => {
            let sum=summary[0];
            console.log(sum);
            sum.connectCount++;
            sum.save()
                .then(data => {
                    return res.send({
                        summary:data,
                        status: 200,
                        'message':'update luot connect thành công'
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
                'message': err.message || 'Some error occurred while finding comment'
            })
        })
});

exports.createSummary = (req, res) => {
    Summary.find()
        .then(summary => {
            summary.connectCount++;
            summary.save()
                .then(data=>{
                    res.send({
                        summary:data,
                        'status':200,
                        'message':'update luot connect thành công'
                    })
                }).catch(err => {
                console.log(err);
                res.send({
                    'status': 404,
                    'message': err.message || 'Some error occurred while finding summary'
                })
            })
        }).catch(err => {
        console.log(err);
        res.send({
            'status': 404,
            'message': err.message || 'Some error occurred while finding summary'
        })
    })
};
exports.createFirstSummary = (req, res) => {
    const summary= new Summary();
    summary.save()
        .then(data=>{
            res.send({
                summary:data,
                'status':200,
                'message':'Tọa mới summary thành công'
            })
        }).catch(err => {
        console.log(err);
        res.send({
            'status': 404,
            'message': err.message || 'Some error occurred while finding summary'
        });
    });
};
