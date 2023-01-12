const express = require('express')
const router = express.Router()

const userApiPrefix = '/users'
const postsApiPrefix = '/posts'

const usersRoutes = require('./users.routes')(userApiPrefix)
const postsRoutes = require('./posts.routes')(postsApiPrefix)

router.use(userApiPrefix, usersRoutes)
router.use(postsApiPrefix, postsRoutes)

module.exports = router