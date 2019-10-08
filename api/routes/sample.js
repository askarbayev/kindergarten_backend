const express = require('express')
const checkAuth = require('../middleware/check-auth')

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'data will be here'
    })
})

router.post('/', checkAuth, (req, res, next)=>{
    res.status(200).json({
        message: 'data posted'
    })
})

router.get('/:sampleId', (req, res, next)=>{
    const id = req.params.sampleId
    if (id === 'special'){
        res.status(200).json({
            message: `Data for id ${id} will presented`
        })
    }
    else{
        res.status(200).json({
            message: 'You passed an id'
        })
    }
})

module.exports = router