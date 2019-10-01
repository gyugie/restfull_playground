'use strict';

exports.ok = function(message, values, res) {
  var data = {
      'status': 200,
      'message': message,
      'results': values
  };
  res.json(data);
  res.end();
};

exports.null = function(message, res) {
    var data = {
        'status': 404,
        'message': message,
    };
    res.json(data);
    res.end();
  };

exports.inValid = function(errorCode, message, res){
  var data = {
    'status': errorCode,
    'messages': message
  }

  res.json(data);
  res.end();
}


