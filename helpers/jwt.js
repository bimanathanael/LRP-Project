var jwt = require('jsonwebtoken');

function encode (data){
  var token = jwt.sign(data, 'sikrit');
  return token
}

function decode (token){
  var decoded = jwt.verify(token, 'sikrit');
  return decoded
}

module.exports = { encode, decode }