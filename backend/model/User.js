
const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    firebaseId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserSchema', UserSchema)