const UserModel=require('../model/user');
const TokenModel=require('../model/token');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const bcrypt=require('bcryptjs');

const signup=(req,res)=>{
   UserModel({
        userName:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    }).save((err,user)=>{
        if (!err) {
          TokenModel({
                _userid:user._id,
                token: crypto.randomBytes(16).toString('hex')
            }).save((err,token)=>{
                if (!err) {
                    var transpoter=nodemailer.createTransport({
                        host:"smtp.gmail.com",
                        port:587,
                        secure:false,
                        requireTLS:true,
                        auth:{
                            user:"ryandey6@gmail.com",
                            pass:"nvglqpqpraprczjo",
                        }
                    });
                    var mailOptions={
                        from:'no-reply@souvik.com',
                        to:user.email,
                        subject:'Acount Verification',
                        text: 'Hello ' + req.body.username + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n'
                    };
                    transpoter.sendMail(mailOptions,function(err){
                        if (err) {
                            console.log("Technical Issuu....");
                        }else{
                            req.flash('message',"A Verfication Email Sent To Your Mail ID.... Please Verify By Click The Link.... It Will Expire By 24 Hrs...")
                            res.redirect('/register')
                        }
                    })
                } else {
                    console.log("Error When Create Token...",err);
                }
            })
        } else {
            console.log("Error When Create User....",err);
        }
    })
}


const confirmation=(req,res)=>{
    
          TokenModel.findOne({token:req.params.token},(err,token)=>{
            if (!token) {
                console.log("Verification Link May Be Expired :(");
                res.redirect('/register')
            } else {
                UserModel.findOne({_id:token._userid,email:req.params.email},(err,user)=>{
                    if (!user) {
                        req.flash('message',"User Not found");
                        res.redirect('/register')
                    } else if(user.isVerified){
                        req.flash("message", "User Already Verified");
                        res.redirect('/register')
                    }else{
                        user.isVerified=true;
                        user.save().then(result=>{
                            req.flash("message", "Your Account Verified Successfully");
                            res.redirect('/login')
                        }).catch(err=>{
                            console.log("Something Went Wrong...",err);
                        })
                    }
                })
            }
        }) 
    }
    
 
const signin=(req,res)=>{
   UserModel.findOne({

    email:req.body.email
   },(err,data)=>{
    if (data) {
        if (data.isVerified) {
            const hashpassword=data.password
            if (bcrypt.compareSync(req.body.password,hashpassword)) {
                const token =jwt.sign({
                    id:data._id,
                    username:data.userName
                },"souvikmondal-1234@#84569",{expiresIn:'5h'})
                res.cookie('Token',token)
                if (req.body.rememberme) {
                    res.cookie('email',req.body.email);
                    res.cookie('password',req.body.password)
                }
                console.log(data);
                res.redirect('/dashboard')
            } else {
                req.flash("message", "Invalid Password");
                res.redirect('/login')
            }
        } else {
            req.flash("message", "Account Is Not Verified");
                res.redirect('/login')
        }
    } else {
        req.flash("message", "Invalid email");
        res.redirect('/login')
    }
   })
}



module.exports={
    signup,
    confirmation,
    signin
}