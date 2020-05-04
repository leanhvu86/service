var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const Tokens = mongoose.model("Tokens");
function verifyRoleByToken(req, res, next) {

  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token']||req.headers['authorization'];
  console.log(token);
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(401).send({ auth: false, message: 'Failed to authenticate token user1.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.userId);
    console.log("id= "+id)
    Tokens.findOne({_id: id}
    , function (err, token) {
      if (err || token === null) {
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token user.' });
      } else {
        Users.findOne({email: token.email}
            , function (err, user) {
              if (err || user === null) {
                return res.status(401).send({ auth: false, message: 'Không tìm thấy tài khoản đăng ký' });
              } else {
                if(user.role<1){
                  return res.status(403).send({ auth: false, message: 'Thí chủ không có quyền.' });
                }
              }
              next();
            });
      }
    });
  });
}

module.exports = verifyRoleByToken;

