const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Patient = mongoose.model('Patient');
const { ensureAuthenticated } = require('../config/auth');

// router.get('',ensureAuthenticated, async(req, res) => {
//     // const patient = await Patient.find({})
     
//     res.render('patientprofile',{
//         //patient,
//         user: req.user
       
//         // patient: req.body.patient,
//         // name: req.body.name,
//         // email: req.body.email,
//         });
//   });
  router.get('/viewprofilepatient',ensureAuthenticated,(req,res) => res.render('patientprofile',{user: req.user}));

// router.get('/viewprofilepatient',ensureAuthenticated,(req,res) => res.render('patientprofile',{patient: req.patient}));
module.exports = router;