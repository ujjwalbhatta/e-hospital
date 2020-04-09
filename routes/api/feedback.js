const express = require('express');
const router = express.Router();
const members = require('../../models/members');



// Gets All Members
router.get('/data', (req, res) => res.json(members));

// Get Single Member
// router.get('/feedbackform/:name', (req, res) => {
//   const found = members.some(member => member.name === (req.params.name));

//   if (found) {
//     res.json(members.filter(member => member.name === (req.params.name)));
//   } else {
//     res.status(400).json({ msg: `No member with the name of ${req.params.name}` });
//   }
// });

// Create Member
router.post('/feedbackform', (req, res) => {
  const newMember = {
    name: req.body.name,
    title: req.body.title,
    message: req.body.message
  };
  members.push(newMember);
  res.send('Feedback Sent <br> Thanks for feedback');
});

// // Update Member
// router.put('/:id', (req, res) => {
//   const found = members.some(member => member.id === parseInt(req.params.id));

//   if (found) {
//     const updMember = req.body;
//     members.forEach(member => {
//       if (member.id === parseInt(req.params.id)) {
//         member.name = updMember.name ? updMember.name : member.name;
//         member.email = updMember.email ? updMember.email : member.email;

//         res.json({ msg: 'Member updated', member });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });

// // Delete Member
// router.delete('/:id', (req, res) => {
//   const found = members.some(member => member.id === parseInt(req.params.id));

//   if (found) {
//     res.json({
//       msg: 'Member deleted',
//       members: members.filter(member => member.id !== parseInt(req.params.id))
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//   }
// });

module.exports = router;