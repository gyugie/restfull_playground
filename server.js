const express   = require('express'),
app             = express(),
bodyParser      = require('body-parser'),
port            = process.env.PORT || 3000;


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

app.listen(port);
console.log('todo list Restfull API server started pm: '+ port);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes');// importing route
routes(app); //register route