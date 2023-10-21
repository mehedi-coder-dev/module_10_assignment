const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  status: {type:Number,default:0},
},{timestamps:true,versionKey:false});

const OTPModel = mongoose.model('OTP', otpSchema);

module.exports = OTPModel;