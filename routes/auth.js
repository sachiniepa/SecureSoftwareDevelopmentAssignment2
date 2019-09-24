// Importing libraries
const { Router } = require('express');
const passport = require('passport');

// initializing router for auth
let router = Router();

router.get('/login', function (req, res) {
     // If authorized direct to Dashboard
    if (req.user) res.redirect('/dashboard');
        // If not authorized direct back to the login page
    else res.redirect('/auth/login/google')

});

// Redirecting to login
router.get('/login/google', passport.authenticate("google", {
    scope: ['profile', "https://www.googleapis.com/auth/drive.file", "email"]
}));

// Callback from Google with the token
router.get('/google/redirect', passport.authenticate('google'), function (req, res) {

    res.redirect('/dashboard')
});

// Sign Out
router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/')
});

module.exports = router;