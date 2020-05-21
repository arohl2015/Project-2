//jquery call to take in input
(document).ready(function() {
    var login = $();
    var email = $();
    var password = $();
  
//validating username and password to take user to decks
    login.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: email.val().trim(),
        password: password.val().trim()
      }};