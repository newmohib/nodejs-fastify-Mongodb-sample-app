const userController = require('../controllers/user.controller'); // Ensure the path is correct

async function userRoutes(fastify, opts) {
    fastify.get('/', userController.getAllUsers);
    fastify.get('/:id', userController.getUserById);
    fastify.post('/', userController.createUser);
    fastify.put('/:id', userController.updateUser);
    fastify.delete('/:id', userController.deleteUser);
}

module.exports = userRoutes; // ✅ Properly export the function
