'use strict';
const bcrypt    = require('bcryptjs');
const User      = require('../model/userModel.js');
const response  = require('./response.js');

exports.auth = function(req, res){
    var email       = req.body.email;
    var password    = req.body.password;

    User.getUserByEmail(email, function(err, callback){
        if(err){
            response.null('email is not found!', res);
        }       
      
        bcrypt.compare(password, callback.password, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
                response.null('password is wrong!', res);
            } else {
                response.ok("success",callback, res);
            }
          });
        
    });
}

exports.create_user = function(req, res){
    var newUser             = new User(req.body);
    var BCRYPT_SALT_ROUNDS  = 10;
    var password            = newUser.password;

   // handler null error
    if(!newUser.username || !newUser.email || !newUser.password){
        res.status(400).send({error:true, message: 'Please provide username / email / password'});
    } else {
       
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hashedPassword) {
            var userObject  = {
                "username"  : newUser.username,
                "email"     : newUser.email,
                "password"  : hashedPassword,
                "created_date": newUser.created_date,
            };
           
                User.createUser(userObject, function(err, user){
                    if(err)
                    res.send(err);
                    response.ok("success",user, res);
                });
        })
        .catch(function(error){
            console.log(error);
            next();
        });
       
    }
};

exports.get_all_user = function(req, res){
    User.getAllUser(function(err, user){
        if(err)
            res.send(err);
            if(user.length > 0){
                response.ok("success",user, res);
            } else {
                response.null("Data Not Found!", res);
            }
    });
};
