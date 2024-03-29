'use strict';
const bcrypt    = require('bcryptjs');
var jwt         = require('jsonwebtoken');
const User      = require('../model/userModel.js');
const response  = require('../helper/response');
const config    = require('../config/config.js');


exports.auth = function(req, res){
    var email       = req.body.email;
    var password    = req.body.password;

    User.getUserByEmailOrUsername(email, function(err, callback){
        if(err){
            response.null('email or username is not found!', res);
        }       
      
        bcrypt.compare(password, callback.password, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
                response.null('password is wrong!', res);
            } else {
                var Token = jwt.sign({ password: callback.password}, config.secret, {
                    expiresIn: 86400
                });

                var results = {
                    authentication: true,
                    token: Token
                }

                response.ok("success", results, res);
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

        User.getUserByEmailOrUsername(newUser.email, function(err, callback){
            if(err) return err;

            if(callback){

                response.inValid(400, "Username or Email Already Axist, please enter another email or username!", res);
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
                        response.ok(`new user ${newUser.username} success added`, true, res);
                    });
                })
                .catch(function(error){
                    console.log(error);
                    next();
                });
                
            }
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


