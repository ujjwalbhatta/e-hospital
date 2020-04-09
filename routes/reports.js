const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();
const cloudinary = require('cloudinary');

require('../models/Report');
require('../handlers/cloudinary');

process.on('unhandledRejection', up => { throw up })
//authentication
const { ensureAuthenticated } = require('../config/auth');
const { ensureAuthenticated1 } = require('../config/auth');
const upload = require('../handlers/multer');
const Report = mongoose.model('Report');

//get request
router.get('/upload_reports',ensureAuthenticated,(req,res)=> res.render('uploadreport'));

//get 
router.get('/seereport',ensureAuthenticated1, async(req,res) => {
  const images = await Report.find({})
  res.render('seereport',{
    images,
    user: req.user
  })
})

//post request
router.post("/upload_reports", upload.single('image'), async(req,res) => {
    const result = await cloudinary.v2.uploader.upload(req.file.path) 
    const report = new Report()
    report.title = req.body.title
    report.imageUrl = result.secure_url
    await report.save()
    res.redirect('/seereport')
    // res.send({
    // message: 'Upload is Done'
  });//image upload.single must match with form name
    

module.exports = router;