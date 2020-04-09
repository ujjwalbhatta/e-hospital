const express = require('express');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash= require('connect-flash');
const passport = require('passport');
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
members = require('./models/members');
const adminRouter = require('./routes/admin.router')

app.use('/public/images/',express.static('./public/images'));
const { ensureAuthenticated } = require('./config/auth');

//passportdr config
require('./config/passport');

//dbcongif
const db = require('./config/keys').MongoURI;

//connect to mongo

mongoose.connect(db,{useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log('MongoDb connected..'))
    .catch(err => console.log(err));

//ejs
app.use(expresslayouts);
app.set('view engine','ejs');

//method override //upload pati ko
app.use(methodOverride('_method'));

//bodyparser // when i removed this balla admin wala kam milyo tara yedi registration ma length ko error ayo bhane dekhi yo unmark garne
app.use(express.urlencoded({extended:true}));

//bodyparsser
app.use(bodyparser.json())

//express-session middleware
app.use(session({
    secret: 'secret',//can be whatever
    resave: true,
    saveUninitialized:true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//feedback 
app.get('/feedback', ensureAuthenticated,(req, res) => {
  res.render('feedback',{
    pageTitle: 'Feedback',
    members
  });
});
//test
app.get('/test',(req,res) => {
  res.render('doctorprofile.ejs');
})
//call routes

app.use('/', require('./routes/index'));
app.use('/patient',require('./routes/patient'));
app.use('/doctor',require('./routes/doctor'));
app.use('/',require('./routes/reports'));
app.use('/',require('./routes/viewpatientReport'));
// app.use('/admin', adminRouter);
app.use('/feedback',require('./routes/api/feedback'));
app.use('/',require('./routes/patientlist'));
app.use('/',require('./routes/doctorprofile'));
app.use('/',require('./routes/patientprofile'));
//patient login handle

app.post('/patient/login', 
  passport.authenticate('patient', 
  { successRedirect: '/patientdashboard', 
    failureRedirect: '/patient/login',
    failureFlash: true 
  }));

//doctor login handle  

app.post('/doctor/Dlogin', 
  passport.authenticate('doctor',
   { successRedirect: '/doctordashboard',
   failureRedirect: '/doctor/Dlogin' ,
   failureFlash: true}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
