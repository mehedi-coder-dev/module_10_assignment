const jwt  = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

module.exports = async(req, res,next)=>{
  const token = req.headers["token"]
  const decodeToken =  jwt.verify(token,process.env.PRIVET_KEY,(error,decode)=>{
    if(!error){
     req.headers.email = decode.data
    next()
    }else{
      res.status(400).json({status:"unauthorise user"})
    }
  })
}