const projectController = require('../controllers/project.controller'); // Ensure the path is correct
const {apiKeyAuth} = require('../middlewares/auth');

async function projectRoutes(fastify, opts) {
    fastify.get('/', projectController.getAllProjects);
    fastify.get('/:id', projectController.getProjectById);
    fastify.post('/', {preHandler: apiKeyAuth}, projectController.createProject);
    fastify.put('/:id', projectController.updateProject);
    fastify.delete('/:id', projectController.deleteProject);
}

module.exports = projectRoutes; // ✅ Properly export the function
