const mongoose = require('mongoose');
const auth = require("../../routers/auth");
const Interests = mongoose.model('Interests');
exports.getInterests = (async (req, res, next) => {

    await Interests.find()
        .then(interests => {
            console.log('tìm provice' + interests);
            res.status(200).send(interests
            )
        }).catch(err => {
            console.log('not found interest');
            res.send({
                'status': 404,
                'message': err.message || 'Some error occurred while finding interest'
            })
        })
});

exports.findInterest = async (req, res, next) => {
    console.log(req.body.user)
    await Interest.findOne({user: req.body.user}, function (err, interests) {
        if (err) {
            console.log(err);
            return res.send({
                'status': 401,
                'message': 'interest not found'
            })
        } else {
            res.send({
                'status': 200,
                interest: interests
            })
        }
    })
}
exports.createInterest = (req, res) => {
    console.log(req.body)
    const interest = new Interests({
        user: req.body.interest.user,
        objectId: req.body.interest.objectId,
        objectType: req.body.interest.objectType
    })

    interest.save()
        .then(data => {
            res.status(200).send(data)
        }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the note'
        })
    })
}
exports.deleteInterest =  (auth.optional,
    (req, res, next) => {
        const interest = new Interests({
            user: req.body.interest.user,
            objectId: req.body.interest.objectId,
            objectType: req.body.interest.objectType
        })
        Interests.find({ user: interest.user })
            .then((interests) => {
                if (!interests) {
                    return res.status(400).send({
                        message: "can not found current user"
                    });
                }
                console.log(interests);
                for(let interested of interests){
                    if(interest.objectId._id===interested.objectId._id){
                        console.log('tìm thấy');
                        console.log(interested);
                        Interests.deleteOne({_id: interested._id}, function (err, result) {

                            if (err) {

                                console.log("error query");
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
                    }
                }
            });

    });
