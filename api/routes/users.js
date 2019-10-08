const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { get_user, user_signin, user_signup} = require('../controllers/users')

const Users = require('../models/users')

router.get('/:userId', get_user)

router.post('/signup', user_signup)

router.post('/signin', user_signin)

module.exports = router