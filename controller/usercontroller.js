const UserModel = require('../model/user');

const index = (req, res) => {
    res.render('index', {
        title: 'home page',
        data:req.user
    })
}

const register = (req, res) => {
    res.render('register', {
        title: "Register Page",
        message: req.flash('message'),
        data:req.user
    })
}

const login = (req, res) => {
        loginData = {},
        loginData.email = (req.cookies.email) ? req.cookies.email : undefined,
        loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('login', {
        title: "Login page",
        message: req.flash('message'),
        data1:loginData,
        data:req.user
    })
}

const dashboard=(req,res)=>{
    if (req.user) {
        UserModel.find({},function(err,userdetail){
            if (!err) {
                res.render('dashboard',{
                    title:'dashboard page',
                    data:req.user
                })
            } else {
                console.log(err);
            }
        })
    }
    
}

const userauth=(req,res,next)=>{
    if (req.user) {
        console.log(req.user);
        next()
    } else {
        req.flash("message", "login first")
        res.redirect('/login')
    }
}

const logout=(req,res)=>{
    res.clearCookie("Token");
    res.redirect("/login");
}

module.exports = {
    index,
    register,
    login,
    dashboard,
    userauth,
    logout
}