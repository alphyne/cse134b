/*
 * Change password
 */
function changePassword() {
  firebase.auth().onAuthStateChanged(function(user) {
    // Check that new passwords match
    var newPassword = document.getElementById('new-password').value;
    var newPasswordConfirm = document.getElementById('new-password-confirm').value;

    if (newPassword !== newPasswordConfirm) {
      alert('Passwords do not match. Try again.');
      return;
    }

    // Call updatePassword
    user.updatePassword(newPassword).then(function() {
      // Update successful
      alert('Password has been updated.');
    }).catch(function(error) {
      // An error happened
      alert(error);

      // If re-authentication needed, show re-auth form
      if (error.code == "auth/requires-recent-login") {
        document.getElementById('reauth').style.display = "block";
      }
    });

  });
}

/*
 * Re-authentication
 */
function reauth() {
  document.getElementById('password-form').style.display = "none";
  firebase.auth().onAuthStateChanged(function(user) {
    
    // Prompt the user to re-provide their sign-in credentials
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
    );
    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
      // User re-authenticated.
      console.log('Re-authenticated');
      document.getElementById('reauth').style.display = "none";
      document.getElementById('password-form').style.display = "block";
      setTimeout(0, function() {
        changePassword();
      });
      
    }).catch(function(error) {
      // An error happened.
      alert(error);
    });
  });
}

  