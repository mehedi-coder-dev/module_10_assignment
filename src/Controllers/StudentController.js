const StudentsModel = require('../Models/StudentsModel')
const jwt = require('jsonwebtoken')
const otpSeder = require('../Utility/otpSeder')
const OTPModel = require('../Models/OTPModel')

// Student registration
exports.studentRegistration = async(req,res)=>{
    try{
        const userData = req.body
       const result = await StudentsModel.create(userData)
       res.status(200).json({status:"success",data:result})
    }catch(error){
       res.status(400).json({status:"fail",data:e.toString()})
    }
}

// Student login
exports.studentLogin = async(req,res)=>{
    try{
        const userData = req.body
        const payload = {
            // exp:Math.floor(Date.now()/1000) + (24+60+60),
            data:userData["email"]
        }
       const result = await StudentsModel.find(userData).count()
     if(result === 1){
         const token = jwt.sign(payload,process.env.PRIVET_KEY)
         res.status(200).json({status:"success",data:token}) 
     }else{
        res.status(400).json({status:"fail",data:"login fail!"})
     }
    }catch(error){
       res.status(400).json({status:"fail",data:"incorret password!"})
    }
}
// Student information
exports.studentInformation = async(req,res)=>{
   const email = req.headers.email

 try{
    const data =  await StudentsModel.find({email:email})
    res.status(200).json({status:'success',data:data})
 }catch(error){
    res.status(400).json({status:'fail',data:'user not found!'})
 }
  

}

// Student update
exports.studentUpdate = async(req,res)=>{
   const email = req.headers.email
   const reqbody = req.body

 try{
    const data =  await StudentsModel.updateOne({email:email},reqbody)
    res.status(200).json({status:'success',data:data})
 }catch(error){
    res.status(401).json({status:'fail',data:'user information not update!'})
 }
  

}
// Student delete
exports.studentDelete = async(req,res)=>{
   const email = req.headers.email
   const reqbody = req.body

 try{
    const data =  await StudentsModel.deleteOne({email:email})
    res.status(200).json({status:'success',data:data})
 }catch(error){
    res.status(401).json({status:'fail',data:'user delete fail'})
 }
  

}


// otp code sender for email
exports.emailOtpCodeSender = async(req,res)=>{
   const email = req.params.email
   const generateOtpCode = Math.floor(Math.random()*900000)
   const emailText = `Your verification code is = ${generateOtpCode} `
   const emailSubject = 'Task manager verification code'


    const data =  await StudentsModel.find({email:email}).count()
    if(data === 1){
      await otpSeder(email,emailText,emailSubject)
      console.log(emailText,emailSubject)
      await OTPModel.create({email:email,otp:generateOtpCode})

      res.status(200).json({status:'success',data:'6 digit otp code sent'})
    }else{
      res.status(401).json({status:'fail',data:'please currect the email address'})
    }


}

// otp code verification
exports.otpVerification = async(req,res)=>{
  const email = req.params.email
  const otp = req.params.otp
  const status = 0;
  const updateStatus = 1


  const data = await OTPModel.find({email:email,otp:otp,status:status}).count()

  if(data === 1){
   await OTPModel.updateOne({email:email,otp:otp,status:status},{status:updateStatus})
   res.status(200).json({status:'success',data:'verification complite'})
  }else{
   res.status(401).json({status:'fail',data:'invalid verification'})
  }


}

// password reset
exports.passwordReset = async(req,res)=>{
   const email = req.body["email"]
   const otp = req.body["otp"]
   const newPassword = req.body["newPassword"];
   const updateStatus = 1
   

  const data =  await OTPModel.find({email:email,otp:otp,status:updateStatus}).count()
  

  if(data === 1){
       await StudentsModel.updateOne({email:email},{password:newPassword})
       res.status(200).json({status:"success",data:'password successfull reset😁'})
  }else{
   res.status(401).json({status:'fail',data:'invalid verification user'})
  }
 
 
 }
 


