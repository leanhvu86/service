const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config'); // get our config file
const mongoose = require("mongoose");
const Tokens = mongoose.model("Tokens");

function verifyToken(req, res, next) {

    // check header or url parameters or post parameters for token
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token)
        return res.status(403).send({auth: false, message: 'No token provided.'});

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(401).send({auth: false, message: 'Failed to authenticate token main.'});

        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        const mongoose = require('mongoose');
        const id = mongoose.Types.ObjectId(req.userId);
        console.log("id= " + id)
        Tokens.findOne({_id: id}
            , function (err, token) {
                if (err || token === null) {
                    return res.status(401).send({auth: false, message: 'Failed to authenticate token user.'});
                } else {
                    next();
                }
            });
    });

}

module.exports = verifyToken;
