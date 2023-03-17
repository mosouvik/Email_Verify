const UserModel=require('../model/user');

exports.CheckDuplicat=(req,res,next)=>{
    UserModel.findOne({
        userName:req.body.username
    }).exec((err,user)=>{
        if (err) {
            console.log(err);
            return
        }
        if (user) {
            req.flash('message',"Username Already Exists");
            return res.redirect('/register')
        }
        UserModel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if (err) {
                console.log(err);
                return
            }
            if (email) {
                req.flash('message',"Email Already Exists")
                return res.redirect('/register')
            }

            const password=req.body.password
            const cpassword=req.body.confirmpassword
            if (password !== cpassword) {
                req.flash('message',"Password & Confirm Password Are Not Matched")
                return res.redirect('/register')
            }
            next();
        })
    })
}