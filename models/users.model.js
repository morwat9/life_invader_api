const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: String,
    phone: String
}, { collection: 'users'})

const User = mongoose.model('user', userSchema)

module.exports = User