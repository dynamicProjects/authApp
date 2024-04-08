const express= require('express');
const app = express();

app.use(express.static(__dirname));

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: dalse,
    saveUninitialized:false
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession);

const port= process.env.PORT || 3000;
app.listen(port,()=>console.log('App listening on port ' + port));

// PASSPORT SETUP

const passport= require('passport');

app.use(passport.initialize());
app.use(passport.session());

// MONGOOSE SETUP

const mongoose = require('mongoose');
const passortLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase',
{useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;
const UserDetail = new Schema({
    username:String,
    password:String
})
UserDetail.plugin(passortLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

// PASPORT LOCAL AUTHENTICATION

passport.use(UserDetails.createStrategy());