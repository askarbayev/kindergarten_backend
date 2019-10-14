const express = require('express')
const router = express.Router()

const { get_user, user_signin, user_signup} = require('../controllers/users')

router.get('/:userId', get_user)

router.post('/signup', user_signup)

router.post('/signin', user_signin)

module.exports = router

