const projectController = require('../controllers/project.controller'); // Ensure the path is correct

async function projectRoutes(fastify, opts) {
    fastify.get('/', projectController.getAllProjects);
    fastify.get('/:id', projectController.getProjectById);
    fastify.post('/', projectController.createProject);
    fastify.put('/:id', projectController.updateProject);
    fastify.delete('/:id', projectController.deleteProject);
}

module.exports = projectRoutes; // ✅ Properly export the function
