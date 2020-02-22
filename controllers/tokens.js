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
    return Tokens.find({ Token: token })
        .then((tokens) => {
            if (!tokens) {
                return res.status(400).send({
                    message: "can not found current user"
                });
            }

            return res.status(200).send({token:tokens.token}
            );
        });
  });


exports.deleteToken = (req, res) => {
    const {body: {token}} = req;
    console.log(token);
    Tokens.findByIdAndRemove({Token:token})
        .then(tokens => {
            if(!tokens) {
                return res.status(404).send({
                    message: "Note not found with id1 " + token
                });
            }
            res.send({message: "token deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + token
            });
        }
        return res.status(500).send({
            message: "Could not delete token with id " + token
        });
    });
};
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

