const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Users = require('../models/users')

exports.get_user = (req, res, next)=>{
    const userId = req.params.userId
    Users.findById(userId)
        .exec()
        .then(user => {
            if (user === null) {
                return res.status(400).json({
                    message: 'User Not Found'
                })
            }
            return res.status(200).json({
                message: user
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: 'User not found',
                error:err
            })
        })
}

exports.user_signin = (req, res, next)=>{
    let body = req.body
    console.log(req.body)
    Users.find({username: body.username})
        .exec()
        .then(users => {
            if (users.length < 1) return res.status(400).json({
                    message: 'Failed to signin'
                })

            let user = users[0]
            bcrypt.compare(body.password, user.password, (err, result)=>{
                if (err) return res.status(400).json({
                        message: 'Failed to signin',
                        error: err
                    })
                
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
                else return res.status(400).json({
                        message: 'Failed to signin',
                        error: err
                    }) 
                
            })

        })
        .catch(err => {
            return res.status(400).json({
                message: 'Failed to signin',
                error: err
            })
        })
}

exports.user_signup = (req, res, next)=>{
    console.log(req.body)
    Users.find({username: req.body.username})
        .exec()
        .then(user => {
            if (user.length >= 1) return res.status(400).json({
                    message: 'User already exists'
                })
            
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err) return res.status(400).json({
                        message: 'Provide Different Password',
                        error: err
                    })
                
                
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
                    
                    return res.status(400).json({
                        message:'User Sign Up Failed',
                        error:err2
                    })
                })
            })
        })
        .catch(err => {
            return res.status(400).json({
                message: 'Failed to register',
                error: err
            })
        })
    
}