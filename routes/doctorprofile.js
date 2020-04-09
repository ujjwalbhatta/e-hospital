const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Doctor = mongoose.model('Doctor');
const { ensureAuthenticated1 } = require('../config/auth');

// router.get('/view_profile',ensureAuthenticated1, async(req, res) => {
//     const doctor = await Doctor.find({})
     
//     res.render('doctorprofile',{
//         doctor,
//         name: req.body.name,
//         email: req.body.email,
//         });
//   });

 router.get('/view_profile',ensureAuthenticated1,async(req,res) =>{
   
 res.render('doctorprofile',
    {
       user: req.user,
    }
 )});


module.exports = router;