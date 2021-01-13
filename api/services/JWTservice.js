const jwt = require('jsonwebtoken');
const SECRET = "ITSaSecReT";

module.exports = {
    issuer : (payload, expiresIn) => {
        return jwt.sign(payload, SECRET, { expiresIn: expiresIn })
    },

    verify: (token) => {
        return jwt.verify(token, SECRET);
    }
}