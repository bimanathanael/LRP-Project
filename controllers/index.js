const firebase = require('firebase')
const firebaseConfig = require('../config/firebaseDB')
const { encode } = require('../helpers/jwt')

firebase.initializeApp(firebaseConfig);

class Controllers {
  static register( req, res ) {
    writeUserData(4,req.body.email, req.body.password, req.body.name, req.body.address)
  
    function writeUserData(userId,email, password,name, address) {
      firebase.database().ref('users/' + userId).set({
        password: password,
        email: email,
        name: name,
        address: address,
      });
    }

    return res.status(201).json("success register")
  }

  static login( req, res ) {
    let isFound = false
    const oneData = firebase.database().ref('/users/')
    oneData.on('value', (allData) => {
      allData.val().forEach( data => {
        if(data.email == req.body.email && data.password == req.body.password){
          isFound = true
          let userData = {
            email: req.body.email
          }
          let tokenJwt = encode(userData)
          return res.status(200).json({ access_token: tokenJwt})
        }
      })
      if(isFound == false){
        return res.status(404).json("login data not found")
      } 
    });
  }

  static getProfile( req, res ) {
    const oneData = firebase.database().ref('/users/')
    oneData.on('value', (allData) => {
      allData.val().forEach( data => {
        if(data.email == req.body.email && data.password == req.body.password){
          return res.status(200).json("login success")
        }
      })
      return res.status(404).json("login data not found")
    }, function (errorObject) {
      return res.status(404).json(errorObject)
    });
  }
}

module.exports = Controllers