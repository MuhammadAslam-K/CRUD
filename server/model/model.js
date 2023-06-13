const mongoose = require("mongoose")

var schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        toLowerCase: true,
    },
    password: {
        type: String,
        require: true
    },

})
const Usersignup = mongoose.model("userSignUp", schema)


var schema1 = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    dept: {
        type: String,
        require: true
    },
    semister: {
        type: Number,
        require: true
    },
})

const Register = mongoose.model("registration", schema1)


module.exports = {
    Usersignup: Usersignup,
    Register: Register
};