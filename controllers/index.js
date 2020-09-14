const firebase = require('firebase')
const firebaseConfig = require('../config/firebaseDB')
const { encode, decode } = require('../helpers/jwt')

firebase.initializeApp(firebaseConfig);

class Controllers {
  static checkUser (){
    let users = firebase.database().ref('/users/')
    let totalUser = 0
    users.on('value', async (allData) => {
      totalUser = await Object.keys(allData.val()).length
      console.log(totalUser, "<<<<")
      return totalUser
    })
  }

  static register( req, res ) {
    let totalUser = Controllers.checkUser()
    writeUserData(totalUser,req.body.email, req.body.password, req.body.name, req.body.address)

    function writeUserData(user,email, password,name, address) {
      firebase.database().ref('users/' + 2).set({
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
        return res.status(404).json({message: "login data not found"})
      } 
    });
  }

  static getProfile( req, res ) {
    try {
      let userData = decode(req.headers.access_token)
      
      const oneData = firebase.database().ref('/users/')
      oneData.on('value', (allData) => {
        allData.val().forEach( data => {
          if(data.email == userData.email){
            return res.status(200).json(data)
          }
        })
      }, function (errorObject) {
        return res.status(404).json(errorObject)
      });
    } catch (error) {
      return res.status(404).json({message: "not valid access token"})
    }
  }
}

module.exports = Controllers