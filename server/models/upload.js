const mongoose = require('mongoose');
const { Schema } = mongoose;

const UploadSchema = new Schema({
  url: String,
});

module.exports = mongoose.model('uploads', UploadSchema);
