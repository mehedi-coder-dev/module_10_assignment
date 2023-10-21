const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: String,
  classNote: String,
  description: String,
  status: String,
  email: String,
});

const WorksModel = mongoose.model('Works', workSchema);

module.exports = WorksModel;