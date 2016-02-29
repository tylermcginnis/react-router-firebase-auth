var Firebase = require('firebase');
var forge = "YOUR-URL-HERE";
var ref = new Firebase(forge);
var cachedUser = null;

var addNewUserToFB = function(newUser){
  var key = newUser.uid;
  ref.child('user').child(key).set(newUser);
};

var genErrorMsg = function(e) {
  var message = ""
  switch ( e.code) {
    case 'AUTHENTICATION_DISABLED':
      message = "The requested authentication provider is disabled for this Firebase application."
      break;
    case 'EMAIL_TAKEN':
      message = "The new user account cannot be created because the specified email address is already in use."
      break;
    case 'INVALID_ARGUMENTS':
      message = "The specified credentials are malformed or incomplete. Please refer to the error message, error details, and Firebase documentation for the required arguments for authenticating with this provider."
      break;
    case 'INVALID_CONFIGURATION':
      message = "The requested authentication provider is misconfigured, and the request cannot complete. Please confirm that the provider's client ID and secret are correct in your App Dashboard and the app is properly set up on the provider's website."
      break;
    case 'INVALID_EMAIL':
      message = "The specified email is not a valid email."
      break;
    case 'INVALID_ORIGIN':
      message = "A security error occurred while processing the authentication request. The web origin for the request is not in your list of approved request origins. To approve this origin, visit the Login & Auth tab in your App Dashboard."
      break;
    case 'INVALID_PROVIDER':
      message = "The requested authentication provider does not exist. Please consult the Firebase Authentication documentation for a list of supported providers."
      break;
    case 'INVALID_TOKEN':
      message = "The specified authentication token is invalid. This can occur when the token is malformed, expired, or the Firebase app secret that was used to generate it has been revoked."
      break;
    case 'INVALID_CREDENTIALS':
      /* message = "The specified authentication credentials are invalid. This may occur when credentials are malformed or expired." */
      /* fallthrough */
    case 'INVALID_USER':
      /* message = "The specified user account does not exist." */
      /* fallthrough */
    case 'INVALID_PASSWORD':
       message = "The specified user login or password is incorrect."
      break;
    case 'NETWORK_ERROR':
      message = "An error occurred while attempting to contact the authentication server. Please check your internet connection."
      break;
    case 'PROVIDER_ERROR':
      message = "A third-party provider error occurred. Please refer to the error message and error details for more information."
      break;
    case 'TRANSPORT_UNAVAILABLE':
      message = "The requested login method is not available in the user's browser environment. Popups are not available in Chrome for iOS, iOS Preview Panes, or local, file:// URLs. Redirects are not available in PhoneGap / Cordova, or local, file:// URLs."
      break;
    case 'USER_CANCELLED':
      message = "The current authentication request was cancelled by the user."
      break;
    case 'USER_DENIED':
      message = "The user did not authorize the application. This error can occur when the user has cancelled an OAuth authentication request."
      break;
    case 'UNKNOWN_ERROR':
      message = "An unknown error occurred. Please refer to the error message and error details for more information."
      /* Fall through */
    default:
      message = "Unknown error occured"
      break;
  }
  return message;
}

var firebaseUtils = {
  createUser: function(user, cb) {
    ref.createUser(user, function(err) {
      if (err) {
        var message = genErrorMsg(err);
        console.log(message);
        cb(message);
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
      if (err) {
        var message = genErrorMsg(err);
        if (cbOnRegister) {
          cbOnRegister(message);
        } else {
          cb && cb(message)
        }
        console.log(message);
      } else {
        authData.email = userObj.email;
        cachedUser = authData;
        this.onChange(true);
        if (cbOnRegister) {
          cb(authData);
          cbOnRegister(false);
        } else {
          cb(false);
        }
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
