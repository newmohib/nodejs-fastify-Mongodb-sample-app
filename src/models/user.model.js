const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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
    password: {
        type: String,
        required: true,
        select: false
        
    },
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

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
        throw new Error('Error comparing passwords');
    }
}

module.exports = mongoose.model('User', userSchema);