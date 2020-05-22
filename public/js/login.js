//jquery call to take in input
(document).ready(function () {
    var login = $("");
    var email = $("");
    var password = $("");

    //validating username and password to take user to decks
    login.on("submit", function (event) {
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

    // loginUser does a post to our "api/login" route
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function () {
                window.location.replace("/account");
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });
    }
});