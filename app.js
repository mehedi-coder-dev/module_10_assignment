const router = require('./src/Routes/api')
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

//security middleware import
const cors = require('cors')
const xss = require('xss')
const hpp = require('hpp')
const helmet = require('helmet')
const body_parser = require('body-parser')
const mongo_sanitize = require('express-mongo-sanitize')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

//sercurity middleware use
app.use(cors())
// app.use(xss())
app.use(hpp())
app.use(helmet())
app.use(body_parser.json())
app.use(mongo_sanitize())
app.use(limiter)

// cannection for mongodb with mongoose

mongoose.connect(process.env.DATA_BASE_STRING).then(()=>{
	console.log("Database connection successful")
}).catch((error)=>{
	console.log(error)
})

//Base route
app.use("/api/v1",router)
// undefine route 
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not found!"})
})

module.exports= app