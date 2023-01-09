const express = require('express')
const router = express.Router()

const userApiPrefix = '/users'

const usersRoutes = require('./users.routes')(userApiPrefix)

router.use(userApiPrefix, usersRoutes)

module.exports = router