const express = require("express");
const path = require('path');
const logger = require('morgan');
const app = express();
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(methodOverride((req, res) => {
    if (req.body && req.body._method){
      const method = req.body._method;
        
      return method;
    }
  }))

  app.use(express.static(path.join(__dirname, 'public')));

// *****************************************
app.use((req, res, next) => {
    const middleWareUsername = req.cookies.name

    res.locals.username = "";
    if (middleWareUsername) {
        res.locals.username = middleWareUsername;
        console.log(`Signed in as ${username}`)
    }
    next();
   
})
app.get('/', (request, response) => {

    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24; 
    response.cookie('hello', 'world', { maxAge: COOKIE_MAX_AGE })
    response.render('signIn')
})

//Sign In POST request
app.post('/sign_in', (req, res) => {
    // res.send(req.body)
    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24; 
    const username = req.body.username;
    res.cookie('username', username, { magAge: COOKIE_MAX_AGE })
    
    res.redirect('/')
})

//Sign Out POST request
app.post('/sign_out', (req, res) => {
    res.clearCookie('username')
    res.redirect('/')
})


// *****************************************

const postRouter = require('./routes/cluck');

// use those routes by app.use function
// if you put '/posts' for the first argument,
// then in the posts.js file, all the routes there, you don't need to add /posts
// app.use(postRouter);
app.use('/cluck', postRouter);

app.listen(3000, 'localhost',() => {
    console.log('Server is listening at http://localhost:3000')
})

module.exports = app;