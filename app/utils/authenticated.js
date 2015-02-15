var Login = require("../components/login-register/Login");
var firebaseUtils = require('./firebaseUtils');

var Authenticated = {
  statics: {
    willTransitionTo: function(transition){
      if(!firebaseUtils.isLoggedIn()){
        Login.attemptedTransition = transition;
        transition.redirect('login');
      }
    }
  }
};

module.exports = Authenticated;