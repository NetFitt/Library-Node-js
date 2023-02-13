const express = require('express')

// for static folder assets
const path = require('path')

//Routes
const books_router = require('./routes/books.router')
const home_router = require('./routes/home.router')
const signup_router = require('./routes/signup.router')
const login_router = require('./routes/login.router')

//Express
const app = express()

//Port 

const port = 3000;

// assets path

app.use(express.static(path.join(__dirname , 'assets')))

// view engine EJS
app.set('view engine' , 'ejs')
app.set('views','views')


// frames


app.use('/',home_router)
app.use('/products',books_router)
app.use('/signup',signup_router)
app.use('/login' ,login_router)


app.listen(port, console.log('connected') )

