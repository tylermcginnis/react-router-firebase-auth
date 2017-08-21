import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDrTzX0nVdFUIuBvBA0OldyjRjHmvymIls",
  authDomain: "add-users-to-app.firebaseapp.com",
  databaseURL: "https://add-users-to-app.firebaseio.com",
  projectId: "add-users-to-app",
  storageBucket: "",
  messagingSenderId: "593111009070"
}

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
