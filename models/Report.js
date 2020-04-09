const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is Required'
  },
  imageUrl: {
    type: String
  }
})

module.exports = mongoose.model('Report', reportSchema)