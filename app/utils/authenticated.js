var Login = require("../components/login-register/Login");
var firebaseUtils = require('./firebaseUtils');

function requireAuth(nextState, replace) {
  if (!firebaseUtils.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

module.exports = requireAuth;