const { findAllUser } = require('../controller/UsersController')

const router = require('express').Router()


router.get('/users', findAllUser)


module.exports = router