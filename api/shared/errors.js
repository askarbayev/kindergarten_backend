exports.error400 = (res, err, message)=>{
    return res.status(400).json({
        message: message,
        error:err
    })
}