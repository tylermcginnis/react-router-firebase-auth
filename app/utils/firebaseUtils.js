var Firebase = require('firebase');
var forge = ""; //YOUR FIREBASE URL HERE
var ref = new Firebase(forge);
var cachedUser = null;

var addNewUserToFB = function(newUser){
  var key = newUser.uid;
  ref.child('user').child(key).set(newUser);
};

var firebaseUtils = {
  createUser: function(user, cb) {
    ref.createUser(user, function(err) {
      if (err) {
        switch (err.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", err);
        }
      } else {
          this.loginWithPW(user, function(authData){
            addNewUserToFB({
              email: user.email,
              uid: authData.uid,
              token: authData.token
            });
          }, cb);
      }
    }.bind(this));
  },
  loginWithPW: function(userObj, cb, cbOnRegister){
    ref.authWithPassword(userObj, function(err, authData){
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false);
      } else {
        authData.email = userObj.email;
        cachedUser = authData;
        cb(authData);
        this.onChange(true);
        cbOnRegister && cbOnRegister(true);
      }
    }.bind(this));
  },
  isLoggedIn: function(){
    return cachedUser && true || ref.getAuth() || false;
  },
  logout: function(){
    ref.unauth();
    cachedUser = null;
    this.onChange(false);
  }
};

module.exports = firebaseUtils;
