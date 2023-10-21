const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
    },
    phoneNumber:{
        type: String,
        required: [true, 'Please provide your phone number']
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    role: {
        type: String,
        enum: ['superadmin', 'schooladmin', 'teacher'],
        default: 'student'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
    passwordChangeAt: {
        type: Date
    },
});


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
userSchema.methods.correctPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};



const User = mongoose.model('User', userSchema);
module.exports = User;