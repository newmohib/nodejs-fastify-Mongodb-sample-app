const userController = require('../controllers/user.controller'); // Ensure the path is correct
const {basicAuth} = require('../middlewares/auth');

async function userRoutes(fastify, opts) {
    fastify.get('/', userController.getAllUsers);
    fastify.get('/:id', userController.getUserById);
    fastify.post('/', {preHandler: basicAuth},userController.createUser);
    fastify.put('/:id', userController.updateUser);
    fastify.delete('/:id', userController.deleteUser);
}

module.exports = userRoutes; // ✅ Properly export the function
