// Importing libraries
const express = require('express');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const passportConfig = require('./configs/passport');
const passport = require('passport');
const cookieSession = require('cookie-session');
const KEYS = require('./configs/keys');
const nunjucks = require('nunjucks');
const fileUpload = require('express-fileupload');

// initializing app
let app = express();
const port = 3000 || process.env.PORT
app.listen(port, () => console.log(`server is running on ${port}`))

// initializing  view
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// initializing static
app.use('/static', express.static('public'));


// initializing session
app.use(cookieSession({
    keys: [KEYS.session_key]
}));

// initializing passport
app.use(passport.initialize());
app.use(passport.session());

// file upload
app.use(fileUpload());

// initializing routes
app.use('', homeRouter) ;// home
app.use('/auth', authRouter); // auth
