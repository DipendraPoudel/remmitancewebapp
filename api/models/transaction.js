const mongoose = require('mongoose')

const transactionSchema = new mongoose.transactionSchema({
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'sender'
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'receiver'
  },
  amountToSend: { type: String, required: true },
  amountToReceive: { type: String, required: true },
  exchangeRate: { type: String, required: true },
  serviceFee: { type: String, required: true },
  paymentCode: { type: String, required: true },
  bankDetails: { type: String, required: true }
})

const Transaction = mongoose.model('Sender', transactionSchema)
module.exports = Transaction
