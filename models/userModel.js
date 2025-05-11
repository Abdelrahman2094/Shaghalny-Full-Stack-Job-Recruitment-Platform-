const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    title: {type: String},
    gender: {type: String},
    description: {type: String},
    location: {type: String},
    phone: {type: String},
    about: {type: String},
    skills: [{type: String}],
    story:{type:String},
    resetToken: {type: String},
    resetTokenExpiry:{type: Date},
    role: {type: String, enum: ['user','admin'], default: 'user'}

});

module.exports = mongoose.model('User', userSchema);