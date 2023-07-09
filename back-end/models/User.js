const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tel: {
        type: Number,
        required: false
    },
    cpf: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true,
        trim: false
    },
    admin: {
        type: Boolean,
        required: true
    }
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema)