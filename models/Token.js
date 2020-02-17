const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const TokensSchema = mongoose.Schema({
    email: String,
    token: String,
    hash: String,
    salt: String,
}, {
    timestamps: true
});


TokensSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'Hanoimuathu');
}

TokensSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('Tokens', TokensSchema);