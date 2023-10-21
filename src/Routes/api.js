const express = require('express')
const router = express.Router()
const Student = require('../Controllers/StudentController')
const WorksController = require('../Controllers/WorksController')
const verifyToken = require('../Middleware/AuthVerifyMiddleware')


router.post('/registration',Student.studentRegistration)
router.post('/login',Student.studentLogin)
router.get('/studentInfo',verifyToken,Student.studentInformation)
router.post('/studentUpdate',verifyToken,Student.studentUpdate)
router.get('/studentDelete',verifyToken,Student.studentDelete)

//verification api
router.get('/emailOtpCodeSender/:email',Student.emailOtpCodeSender)
router.get('/otpVerification/:email/:otp',Student.otpVerification)
router.post('/resetPassword',Student.passwordReset)

// works crud api
router.post('/create',verifyToken,WorksController.createWorks)
router.get('/read/:id',verifyToken,WorksController.readWorks)
router.post('/update/:id/:status',verifyToken,WorksController.updateWorks)
router.get('/delete/:id',verifyToken,WorksController.deleteWorks)



module.exports = router;