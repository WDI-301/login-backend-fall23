const mongoose = require('mongoose')

// const {Schema, model} = mongoose
// const userSchema = new Schema({})

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

// module.exports = model('User', userSchema)
module.exports = mongoose.model('User', userSchema)