'user strict';

var sql = require('./db.js');

//Task object contructor 
const User = function(user){
    this.username   = user.username;
    this.email      = user.email;
    this.password   = user.password;
    this.created_date= new Date();    
};

//Todo insert
User.createUser = function(newUser, result){
    sql.query('insert into user set ?', newUser, function(err, res){
        if(err){
            console.log('error:', err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

User.getAllUser = function(result){
    sql.query("Select * from user", function (err, res) {
        if(err) {
            result(null, err);
        } else {
         result(null, res);
        }
    });   
}

User.getUserByEmailOrUsername = function(params, callback){
    sql.query(`Select * from user where email = ? OR username = ?`, [params, params] , function(err, result){
        if(err){
            callback(null, err);
        } else {
            callback(null, result[0]);
        }
    });
}



module.exports = User;