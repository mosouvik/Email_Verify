const express=require('express');
const Route=express.Router();
const AuthController=require('../controller/authController')
const VerifySignup=require('../middleware/userVerify');


Route.post('/signup',[VerifySignup.CheckDuplicat],AuthController.signup);
Route.get('/confirmation/:email/:token',AuthController.confirmation)
Route.post('/signin',AuthController.signin);



module.exports=Route