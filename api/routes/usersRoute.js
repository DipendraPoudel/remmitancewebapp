const express = require('express')
const router = express.Router()

const {
  signup,
  signin,
  verifyJwtToken,
  sendOtp
  // forgotPassword,
  // resetPassword,
  // getUserProfile,
  // updatePassword,
  // updateProfile,
  // logout,
  // allUsers,
  // getUserDetails,
  // updateUser,
  // deleteUser
} = require('../controllers/auth')

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/sendOtp').post(verifyJwtToken, sendOtp)

module.exports = router
