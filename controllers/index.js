const firebase = require('firebase')
const firebaseConfig = require('../config/firebaseDB')
const { encode, decode } = require('../helpers/jwt')
const validator = require("email-validator");

firebase.initializeApp(firebaseConfig);

class Controllers {
  static register( req, res ) {
    if(validator.validate(req.body.email) == false) {
      return res.status(404).json({message: "email not valid"})
    }
    writeUserData(req.body.email, req.body.password, req.body.name, req.body.address)

    function writeUserData(email, password,name, address) {
      firebase.database().ref('users/').push().set({
        password: password,
        email: email,
        name: name,
        address: address,
      });
      return res.status(201).json({message: "success register"})
    }
  }

  static login( req, res ) {
    let isFound = false
    const oneData = firebase.database().ref('/users/')
    oneData.on('value', (allData) => {
      for (const data in allData.val()) {
        if(allData.val()[data].email == req.body.email && allData.val()[data].password == req.body.password){
          isFound = true
          let userData = {
            email: req.body.email
          }
          let tokenJwt = encode(userData)
          return res.status(200).json({ access_token: tokenJwt})
        }
      }
      if(isFound == false){
        return res.status(404).json({message: "login data not found"})
      } 
    });
  }

  static getProfile( req, res ) {
    try {
      let userData = decode(req.headers.access_token)
      
      const oneData = firebase.database().ref('/users/')
      oneData.on('value', (allData) => {
        for (const data in allData.val()) {
          if(allData.val()[data].email == userData.email){
            return res.status(200).json(allData.val()[data])
          }
        }
      }, function (errorObject) {
        return res.status(404).json(errorObject)
      });
    } catch (error) {
      return res.status(404).json({message: "not valid access token"})
    }
  }
}

module.exports = Controllers