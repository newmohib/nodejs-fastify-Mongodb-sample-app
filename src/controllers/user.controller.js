const User = require('../models/user.model')
const { basicAuth, verifyUser } = require('../middlewares/auth');

async function getAllUsers(request, reply) {
    try {
        const users = await User.find()
        reply.send(users)
    } catch (error) {
        reply.status(500).send(error)
    }
}

async function getUserById(request, reply) {
    try {
       const user = await User.findById(request.params.id)
        reply.send(user)
    } catch (error) {
        reply.status(500).send(error)
    }
}

async function createUser(request, reply) {
    try {
        const user = await User(request.body)
        const result = await user.save()
        reply.send(result)
    } catch (error) {
        reply.status(500).send(error)
    }
}

async function updateUser(request, reply) {
    try {
        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true })
        reply.send(user)
    } catch (error) {
        reply.status(500).send(error)
    }
}

async function deleteUser(request, reply) {
    try {
        const user = await User.findByIdAndDelete(request.params.id)
        console.log("Deleted user", user);
        
        reply.status(203).send("")
    } catch (error) {
        reply.status(500).send(error)
    }
}

async function login(fastify, request, reply) {
    try {
        const { email, password } = request.body;
        const {isVerify, user} = await verifyUser({ email, password });
        if (!isVerify) {
            return reply.status(401).send({ error: 'Unauthorized' });
        }
        const token = fastify.jwt.sign({ id: user._id, role: user.role, email: user.email });
        // request.user = user;
        reply.send({ token });
    } catch (error) {
        console.log(error);
        return reply.status(401).send({ error: 'An error occured during authentication' });
        
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
}