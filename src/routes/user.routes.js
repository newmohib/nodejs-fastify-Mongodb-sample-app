const userController = require('../controllers/user.controller'); // Ensure the path is correct
const {basicAuth} = require('../middlewares/auth');

async function userRoutes(fastify, opts) {
    fastify.get('/',{onRequest: [fastify.jwtAuth]}, userController.getAllUsers);
    fastify.get('/:id', userController.getUserById);
    fastify.post('/', {onRequest: [fastify.jwtAuth, fastify.hasRole('Admin')]}, userController.createUser);
    // fastify.post('/', {preHandler: basicAuth},userController.createUser);
    fastify.put('/:id', userController.updateUser);
    fastify.delete('/:id', userController.deleteUser);
    fastify.post('/login', async (request, reply) => {
        return userController.login(fastify, request, reply);
    });
}

module.exports = userRoutes; // ✅ Properly export the function
