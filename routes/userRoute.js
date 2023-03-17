const express=require('express');
const Route=express.Router();
const UserController=require('../controller/usercontroller');

Route.get('/',UserController.index);
Route.get('/register',UserController.register);
Route.get('/login',UserController.login);
Route.get('/dashboard',UserController.userauth,UserController.dashboard);
Route.get('/logout',UserController.logout);

module.exports=Route