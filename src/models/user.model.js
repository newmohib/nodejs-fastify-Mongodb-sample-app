const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        true: true
    },
    lastName: {
        type: String,
        required: true,
        true: true
    },
    email: {
        type: String,
        required: true,
        true: true,
        unique: true,
        lowercase: true
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    role: {
        type: String,
        enum: ['Admin', 'Project manager', 'Team member'],
        default: 'Team member'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);