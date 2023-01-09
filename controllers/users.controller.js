const usersService = require('../services/users.service')

let apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix

    return {
        read: _read,
        readById: _readById
    }
}

async function _read(req, res) {
    try {
        const users = await usersService.read()
        res.json(users)
    } catch (error) {
        res.send(error)
    }
}

async function _readById(req, res){
    try {
        const user = await usersService.readById(req.params.id)
        res.json(user)
    } catch(error){
        res.status(500).send(error)
    }
}