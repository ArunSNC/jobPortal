const bcrypt = require('bcrypt');

const salt = async () => {
    return await bcrypt.genSalt(12);
}

module.exports = {

    hashedPassword : async (password) => {
        return await bcrypt.hash(password, await salt())
    },

    comparePassword: async (password, hash) => {
        return await bcrypt.compare(password, hash)
    }
}