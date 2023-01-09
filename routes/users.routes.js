const router = require('express').Router()
const usersControllerFactory = require('../controllers/users.controller')

module.exports = function (apiPrefix) {
    const usersController = usersControllerFactory(apiPrefix)

    router.get('/', usersController.read)
    router.get('/:id([0-9a-zA-Z]{24})', usersController.readById)

    return router
}