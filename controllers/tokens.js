require("mongoose");
require("passport");
const auth = require("../routers/auth");
const Tokens = require("../models/Token");
//POST new user route (optional, everyone has access)


//GET current route (required, only authenticated users have access)
exports.currentAuthen =
  (auth.optional,
  async (req, res) => {

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
    (req, res) => {
        const {body: {token}} = req;
        console.log(token);
        Tokens.findOne({ token: token }, function(err, tokenSchema) {
            if (err) {
                return res.send({
                    status: 401,
                    message: "Error"
                });
            }
            if (tokenSchema) {
                console.log(tokenSchema._id);
                Tokens.deleteOne({_id: tokenSchema._id}, function (err, result) {

                    if (err) {

                        console.log("error query");
                        return res.send({
                            status: 401,
                            message: "Error"
                        });
                    } else {

                        console.log(result);
                        return res.send({
                            status: 200,
                            message: "Xóa token thành công"
                        });
                    }

                });
            }
        })
});
