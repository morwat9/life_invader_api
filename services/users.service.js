const mongoose = require('mongoose')
const User = require('../models/users.model.js')

module.exports = {
    read: _read,
    readById: _readById
}

async function _read() {
    try {
        const users = await User.find({})
        return users
    } catch (error){
        return error
    }
}

async function _readById(id) {
    try {
        const user = await User.findOne({ _id: mongoose.Types.ObjectId(id)})
        return user
    } catch (error) {
        return error
    }
}