const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Users = require('../models/users')
const {error400} = require('../shared/errors')

exports.get_user = (req, res, next)=>{
    const userId = req.params.userId
    Users.findById(userId)
        .exec()
        .then(user => {
            if (user === null) 
                return error400(res, null, 'User Not Found')
            return res.status(200).json({
                message: user
            })
        })
        .catch(err => {
            return error400(res, err, 'User Not Found')
        })
}

exports.user_signin = (req, res, next)=>{
    let body = req.body
    console.log(req.body)
    Users.find({username: body.username})
        .exec()
        .then(users => {
            if (users.length < 1) 
                return error400(res, null, 'Failed to signin')

            let user = users[0]
            bcrypt.compare(body.password, user.password, (err, result)=>{
                if (err) return error400(res, err, 'Failed to signin')
                    
                if (result) {
                    const token = jwt.sign({
                        email: user.username,
                        userId: user._id
                    }, 
                    process.env.JWT_KEY,
                    {expiresIn: "1h"}
                    )
                    return res.status(200).json({
                        message: 'Auth successful',
                        token
                    })
                }
                else return error400(res, err, 'Failed to signin')
                
            })

        })
        .catch(err => {
            return error400(res, err, 'Failed to signin')
        })
}

exports.user_signup = (req, res, next)=>{
    console.log(req.body)
    Users.find({username: req.body.username})
        .exec()
        .then(user => {
            if (user.length >= 1) 
                return error400(res, null, 'User already exists')
            
            bcrypt.hash(req.body.password, 10, (err, hash)=>{

                if (err) return error400(res, err, 'Provide Different Password')
                    
                const user = new Users({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    name: req.body.name,
                    password: hash,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    signupDate: new Date()
            
                })
        
                console.log(user)
        
                user.save().then(result=>{
                    console.log('Result', result)
                    res.status(200).json({
                        message:`User ${req.body.username} signed up successfully!`
                    })
                })
                .catch(err2 => {
                    return error400(res, err2, 'User Sign Up Failed')
                })
            })
        })
        .catch(err => {
            return error400(res, err, 'Failed to register')
        })
    
}