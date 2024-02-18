const mongoose = require('mongoose')

// create schema for users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    github: {
        type: String
    },
    linkedin: {
        type: String
    },
    profile: {
        type: String
    }
})

const users = mongoose.model("users",userSchema)
module.exports = users;