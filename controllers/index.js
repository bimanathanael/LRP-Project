const firebase = require('firebase')
var firebaseConfig = {
  apiKey: "AIzaSyCCrVRA9RMnrrlSX5ZppDKlcek2QdUyVXc",
  authDomain: "lrp-project-b0a46.firebaseapp.com",
  databaseURL: "https://lrp-project-b0a46.firebaseio.com",
  projectId: "lrp-project-b0a46",
  storageBucket: "lrp-project-b0a46.appspot.com",
  messagingSenderId: "638126377204",
  appId: "1:638126377204:web:e46c74711b3bf12468b6a1"
};

firebase.initializeApp(firebaseConfig);

class Controllers {
  static register( req, res ) {
    writeUserData(4,req.body.email, req.body.password)
  
    function writeUserData(userId,email, password) {
      firebase.database().ref('users/' + userId).set({
        password: password,
        email: email,
      });
    }

    return res.status(201).json("success register")
  }

  
}

module.exports = Controllers