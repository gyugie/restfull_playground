'use strict';

const User      = require('../model/userModel.js');
const response  = require('./response.js');

exports.create_user = function(req, res){
    var newUser = new User(req.body);
    var userObject = {
        "username"  : newUser.username,
        "email"     : newUser.email,
        "password"  : newUser.password,
        "created_date": newUser.created_date,
    };
   // handler null error
    if(!newUser.username || !newUser.email || !newUser.password){
        res.status(400).send({error:true, message: 'Please provide username / email / password'});
    } else {
        User.createUser(userObject, function(err, user){
            if(err)
            res.send(err);
            response.ok("success",user, res);
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
