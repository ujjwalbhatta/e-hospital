const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

//authentication
const { ensureAuthenticated1 } = require('../config/auth');

// router.get('/seemembers', (req, res) =>
//   res.render('seemembers', {
//     title: 'Member App',
//     members
//   })
// );
// router.post('/seemembers',(req,res) =>{
// const newMember = {
//   id: members._id,
//   name: req._id,
//   email: req.email,
// }

// members.save(newMember);
// })
//Mongo URI
const mongoURI ='mongodb+srv://ujjwal:Pranjita@patients-evtmn.mongodb.net/test?retryWrites=true&w=majority';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI)

router.get
//init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads_by_dr');
  });

//create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => { //crptorandom generates long string          
            if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads_by_dr'
          };
          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({storage});  

// @route GET /
// @desc Loads form
router.get('/view_patientreport', ensureAuthenticated1,(req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('view_patientreport', { files: false });
      } else {
        files.map(file => {
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        res.render('view_patientreport', { files: files });
      }
    });
  })
// @route POST /upload
// @desc  Uploads file to DB
router.post('/view_patientreport', upload.single('file'), (req, res) => {
    // res.json({ file: req.file }); //view_patient from ejs file
    res.redirect('/patientdashboard');
  });

// routes GET /files
// display all file s in json
router.get('/files',(req,res)=>{
    gfs.files.find().toArray((err, files) =>{
        //check if files
        if(!files || files.length === 0) {
            return res.status(404).json({
                err : 'No files exist'
            });
        }

        //files exists
        return res.json(files);
    });
});  

// routes GET /files/:filename
// display single files in json
router.get('/files/:filename',(req,res)=>{
    gfs.files.findOne({filename: req.params.filename},(err,file) =>{
         //check if files
         if(!file || file.length === 0) {
            return res.status(404).json({
                err : 'No file exist'
            });
        }
        //file exists
        return res.json(file);
    });
});  

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });

  // @route DELETE /files/:id
// @desc  Delete file
router.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads_by_dr' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
  
      res.redirect('/patientdashboard');
    });
  })


module.exports = router;