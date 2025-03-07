const mongoose = require('mongoose');
const User = require('./user.model');


const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        true: true
    },
    description: {
        type: String,
        required: true,
        true: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (value) {
                const user = await User.findById(value);
                return user && user.role === 'Project manager' || user.role === 'Admin';
            },
            message: props => 'User role must be "Project manager" or "Admin"'
        }
    },
    teamMembers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', ProjectSchema);