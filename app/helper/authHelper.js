const jwt        = require('jsonwebtoken');
const config     = require('../config/config');
const response   = require('./response');


exports.verifyToken = function(req, res, next){
    let token = req.headers['x-access-token'];

    if(!token){
        return response.inValid(403,"No Token Provided!", res);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return response.inValid(500, `Failed to authentication ${err}`, res);
        }
      
        next();
    });
}


