const jwt=require('jsonwebtoken');

exports.userjwt=(req,res,next)=>{
    if (req.cookies && req.cookies.Token) {
        jwt.verify(req.cookies.Token,'souvikmondal-1234@#84569',(err,data)=>{
            req.user=data
            next()
        })
    } else {
        next()
    }
}