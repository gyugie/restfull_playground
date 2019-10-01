'user strict';
var mysql = require('mysql');

// connection to database
// var connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'user.ids',
//     database:'restfull_playground'
// });

// connection.connect(function(err){
//     if(err) throw err;
// });

// module.exports = connection;

exports.execute = sql => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'user.ids',
            database:'restfull_playground'
        });
        
        connection.connect(err => {
            if(err) throw err;
            console.log('connected to database');
        });

        connection.query(sql, (err, rows, fields) => {
            if(err) 
            reject(err);
            resolve(rows);
        });
    });
}



