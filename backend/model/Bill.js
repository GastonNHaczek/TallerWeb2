
const mongoose = require('mongoose')
const User = require('./User')
const { Schema } = mongoose

const BillSchema = new Schema({
    cardName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true
    },
    cardSecurityCode: {
        type: Number,
        required: true
    },
    cardExpiration: {
        type: Date,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    buyer: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('BillSchema', BillSchema)