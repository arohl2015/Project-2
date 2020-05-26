$(document).ready(function () {
  // Getting references to our form and input
  var signUp = $("#signup-form");
  var email = $("#email");
  var password = $("#password");

  // When the signup button is clicked, we validate the email and password are not blank
  signUp.on("submit", function (event) {
    console.log("submit clicked")
    event.preventDefault();
    var userData = {
      email: email.val().trim(),
      password: password.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    email.val("");
    password.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    console.log("entered the signup function");
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function (data) {
        window.location.replace("/login");
      })
  }
});