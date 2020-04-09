const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Patient = mongoose.model('Patient');
const { ensureAuthenticated1 } = require('../config/auth');

router.get('/patient_list',ensureAuthenticated1, async(req, res) => {
    const patient = await Patient.find({})
     
    res.render('patient_list',{
        patient,
        tokenname: req.body.tokenname,
        name: req.body.name,
        email: req.body.email,
        date: req.body.date
        });
  });

module.exports = router;