const mongoose = require("mongoose");
const passport = require("passport");
const auth = require("../routers/auth");
const Tokens = require("../models/Token");
//POST new user route (optional, everyone has access)


//GET current route (required, only authenticated users have access)
exports.currentAuthen =
  (auth.optional,
  async (req, res, next) => {

    const {body: {token}} = req;
    return Tokens.find({ token: token })
        .then((tokens) => {
            if (!tokens) {
                return res.status(400).send({
                    message: "can not found current user"
                });
            }
            console.log(tokens);
            return res.send({
                token:tokens,
                status:200
            }
            );
        });
  });


exports.deleteToken =  (auth.optional,
    (req, res, next) => {
        const {body: {token}} = req;
        console.log(token);
        Tokens.findOne({ token: token }, function(err, tokenSchema) {
            if (err) {
                return res.send({
                    status: 401,
                    message: "Error"
                });
            }
            /*if (!userSchema) {
                return res.send({
                    status: 401,
                    message: "Username or password invalid"
                });
            }
            if (!userSchema.validatePassword(user.password)) {
                return res.send({
                    status: 401,
                    message: "Username or passwordno invalid"
                });
            }*/
            console.log(tokenSchema._id);
            if (tokenSchema) {
                Tokens.deleteOne({_id: tokenSchema._id}, function (err, result) {

                    if (err) {

                        console.log("error query");

                    } else {

                        console.log(result);

                    }

                });
            }
        })
});
/*
exports.deleteToken =
    (auth.optional,
         (req, res, next) => {
        console.log('Test 123456');
            const {body: {token}} = req;
            console.log(token);
            return Tokens.delete({ Users: token })
                .then((tokens) => {
                    if (tokens) {
                        return res.status(400).send({
                            message: "can not delete current token"
                        });
                    }

                    return res.json({
                            status:200,
                            message: " delete current token"
                        }
                    );
                });
        });
*/

