const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  filename: {
    type: String,
    unique: true,
    require: true
  },
  contentType : {
    type: String,
    required: true
  },
  imageBased64: {
    type: String,
    required: true
  }

})

module.exports = UploadModel = mongoose.model('uploads', uploadSchema)