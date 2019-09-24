const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

// Set cookies for the user
passport.serializeUser((user, done) => {

    let sessionUser = {
        _id: user.googleID,
        accessToken: user.accesstoken,
        name: user.name,
        pic_url: user.pic_url,
        email: user.email
    }

    done(null, sessionUser)
})

// Get ccokies
passport.deserializeUser((sessionUser, done) => {

    done(null, sessionUser)
})


passport.use(

    new GoogleStrategy(
        // Keys
        {
            clientID: keys.googleOauth.clientID,
            clientSecret: keys.googleOauth.clientSecret,
            callbackURL: keys.googleOauth.callback,
            passReqToCallback: true

        }, (request, accessToken, refreshToken, profile, done) => {

            //Saving the session data
            user = {
                "accesstoken": accessToken,
                'googleID': profile.id,
                'name': profile.displayName,
                'pic_url': profile._json.picture,
                'email': profile._json.email
            }

            done(null, user)
        }
    )
)