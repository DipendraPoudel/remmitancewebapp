const mongoose = require('mongoose')

const receiverSchema = new mongoose.receiverSchema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, required: true },
  mobileNo: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  IdType: { type: String, required: true },
  receiveMethod: { type: String, required: true },

  adress: [
    {
      tole: { type: String }
    },
    {
      city: { type: String, required: true }
    },
    {
      district: { type: String, required: true }
    },
    {
      zone: { type: String, required: true }
    },

    {
      country: { type: String, required: true }
    }
  ],
  bankdetails: [
    {
      accountHolderName: { type: String, required: true },
      accountName: { type: String, required: true },
      bankName: { type: String, required: true },
      branch: { type: String, required: true }
    }
  ]
})

const Receiver = mongoose.model('Receiver', receiverSchema)
module.exports = Receiver
