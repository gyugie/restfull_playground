'user strict';
var mysql = require('mysql');

// connection to database
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'user.ids',
    database:'restfull_playground'
});

connection.connect(function(err){
    if(err) throw err;
});

module.exports = connection;