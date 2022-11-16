const mongoose = require('mongoose')

const exchangeRateSchema = new mongoose.exchangeRateSchema({
  fromCurrency: { type: String, required: true },
  ToCurrency: { type: String, required: true },
  fromRate: { type: String, required: true },
  ToRate: { type: String, required: true }
})

const ExchangeRate = mongoose.model('Sender', exchangeRateSchema)
module.exports = ExchangeRate
