const express   = require('express'),
app             = express(),
bodyParser      = require('body-parser'),
port            = process.env.PORT || 3000;
const helper       = require('./app/helper/authHelper.js');


const mysql = require('mysql');

//connection configuration
const myconnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'user.ids',
    database: 'restfull_playground'
});
// connecting to db
myconnection.connect();

//use JWT auth to secure the api
app.listen(port);
console.log('todo list Restfull API server started pm: '+ port);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./app/routes/router');// importing route
routes(app); //register route