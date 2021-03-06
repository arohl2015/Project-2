//jquery call to take in input
$(document).ready(function () {
    var login = $("#login-form");
    var email = $("#email");
    var password = $("#password");

    //validating username and password to take user to decks
    login.submit(function (event) {
        console.log("click");
        event.preventDefault();
        var userData = {
            email: email.val().trim(),
            password: password.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        };

        // If we have an email and password, run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        email.val("");
        password.val("");
    });

    // LoginUser does a post to our "api/login" route
    function loginUser(email, password) {
        console.log("enter loginUser function")
        console.log(email + password)
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function (tokenData) {
                //Sets the authentication token in local storage to the token data from the server
                localStorage.authToken = JSON.stringify(tokenData);

                window.location.href = '/deck';;
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });
    }
});