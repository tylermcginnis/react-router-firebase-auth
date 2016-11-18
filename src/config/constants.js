import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDHL6JFTyBcaV60WpE4yXfeO0aZbzA9Xbk",
  authDomain: "practice-auth.firebaseapp.com",
  databaseURL: "https://practice-auth.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth