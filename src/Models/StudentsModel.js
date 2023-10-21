const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  mobile: String,
  password: String,
  address: String,
  roll: String,
  class: String,
},{timeseries:true,versionKey:false});

const StudentsModel = mongoose.model('Students', studentSchema);

module.exports = StudentsModel;