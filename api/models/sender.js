const mongoose = require('mongoose')

const senderSchema = new mongoose.senderSchema({
  user: mongoose.Types.ObjectId,
  required: true,
  ref: 'user',
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  IdType: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  adress: [
    {
      unit: { type: String, required: true }
    },
    {
      street: { type: String, required: true }
    },
    {
      city: { type: String, required: true }
    },
    {
      state: { type: String, required: true }
    },
    {
      postCode: { type: String, required: true }
    },
    {
      country: { type: String, required: true }
    }
  ]
})

const Sender = mongoose.model('Sender', senderSchema)
module.exports = Sender
