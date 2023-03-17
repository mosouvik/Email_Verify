const express=require('express');
const ejs=require('ejs');
const mongoose=require('mongoose');
const session=require('express-session');
const flash=require('connect-flash');
const cookieparser=require('cookie-parser');
const path = require('path');

const app=express();

const port=process.env.PORT|| 5100


app.use(flash());
app.use(cookieparser());
app.use(session({
    cookie:{maxAge:50000},
    secret:'nodejs',
    resave:false,
    saveUninitialized:false,
}))

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views','views');

const UserAuth=require('./middleware/userAuth');
app.use(UserAuth.userjwt);

const UserRoute=require('./routes/userRoute');
app.use(UserRoute);

const AuthRoute=require('./routes/authRouter');
app.use(AuthRoute)



const DB="mongodb+srv://nodeClassjan:BrnrXRpwEfvb35kG@cluster0.4axmojt.mongodb.net/Auth_jwt_emailverify_nodejs"
mongoose.connect(DB,({useNewUrlParser:true,useUnifiedTopology:true}))
.then((res)=>{
    app.listen(port,()=>{
        console.log("server connected.........");
        console.log(`server running http://localhost:${port}`);
    })
    
}).catch(err=>{
    console.log(err);
})