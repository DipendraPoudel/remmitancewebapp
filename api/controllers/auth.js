const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const twilio = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_VERIFICATION_SID
)

//generate jwtToken and return it
function generateJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}
exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      role
    } = req.body
    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.status(409).send('User already exist.Please login')
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      role
    })
    const newUser = generateJwtToken(user)
    res.status(201).json({
      status: 'success',
      data: newUser
    })
  } catch (error) {
    res.status(401).json(error)
  }
}

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.comparePassword(password, user.password))) {
      res.status(401).json({
        message: 'Incorrect email or password',
        error: 'User not found'
      })
    } else {
      const token = generateJwtToken(user)
      res.status(200).json({
        message: 'Login successful',
        user,
        token
      })
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
      error: error.message
    })
  }
}

exports.verifyJwtToken = async (req, res, next) => {
  // Getting token and check of it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res
      .status(403)
      .json({ message: 'You are not logged in, Please login to access' })
  }
  try {
    //Verification of token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return res.status(401).json({
        message: 'The user belonging to this token no longer exist'
      })
    }
    // // if user changed password after jwt is issued

    // if(currentUser.changedPasswordAfter(decoded.iat)){
    //     return next(new AppError("User recently changed password, Please login again", 401));
    // }
    // Grant access to protected route
    req.user = currentUser
  } catch (error) {
    console.log(error)
  }

  next()
}

exports.sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body

    const OtpCode = await twilio.verify
      .services(process.env.TWILIO_VERIFICATION_SID)
      .verifications.create({ to: `${phoneNumber}`, channel: 'sms' })
    res.status(200).json({
      message: 'Enter the code sent to your mobile to login',
      OtpCode
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}
