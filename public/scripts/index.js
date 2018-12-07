
// Initialize Firebase
var config = {
  apiKey: "AIzaSyB5c9mjm-mf1eViUdp-jc-PFcr8bTFgLTg",
  authDomain: "mememaster-ej.firebaseapp.com",
  databaseURL: "https://mememaster-ej.firebaseio.com",
  projectId: "mememaster-ej",
  storageBucket: "/",
  messagingSenderId: "815545865797"
};
firebase.initializeApp(config);

//setAccountName();

function getUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user.displayName + ' signed in');
    } else {
      // No user is signed in.
      console.log('No user signed in');
    }
  });
}

function setAccountName() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById('account_name').innerHTML = user.displayName;
    } 
  });
}

function checkUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      window.location.replace('/');
    } 
  });
}

function signOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = "/";
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}