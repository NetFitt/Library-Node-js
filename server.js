//express

const express = require('express')

// for static folder assets
const path = require('path')

//Routes

const books_router = require('./routes/books.router')
const home_router = require('./routes/home.router')
const signup_router = require('./routes/auth.router')

//getting session cookie

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

//connect flash
const flash = require('connect-flash')

//Express
const app = express()

//VARIABLES 

const url = 'mongodb://127.0.0.1:27017/Library'; 
const port = 3000;

// assets path
app.use(express.static(path.join(__dirname , 'assets')))



// view engine EJS

app.set('view engine' , 'ejs')
app.set('views','views')

//flash


// the sesion development

let store = new MongoDBStore({
    uri:url,
    collection:'sessions'    
}) 

app.use(session({
    secret:'key',
    resave:true,
    saveUninitialized:true,
    store:store
}))


// frames

app.use(flash())

app.use('/',home_router)
app.use('/books',books_router)
app.use('/',signup_router)






app.listen(port, console.log('connected') )

