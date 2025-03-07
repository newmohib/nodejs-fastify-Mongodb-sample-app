const Project = require('../models/project.model')
const User = require('../models/user.model')

async function getAllProjects(request, reply) {
    try {
        const projects = await Project.find().populate('projectManager', 'firstName lastName email').populate('teamMembers', 'firstName lastName email')
        if (!projects) {
            return reply.status(404).send({ message: 'Projects not found' })

        }
        reply.send(projects)
    } catch (error) {
        reply.status(404).send(error)
    }
}

async function getProjectById(request, reply) {
    try {
        const project = await Project.findById(request.params.id).populate('projectManager', 'firstName lastName email').populate('teamMembers', 'firstName lastName email')
        if (!project) {
            return reply.status(404).send({ message: 'Project not found' })
        }
        reply.send(project)
    } catch (error) {
        reply.status(404).send({message: "Invalid project id"})
    }
}

async function createProject(request, reply) {
    try {
        // confirm that the projectManager id exists in the database
        // and is valid
        const projectManager = await User.findById(request.body.projectManager)
        if (!projectManager || !["Project manager", "Admin"].includes(projectManager.role)) {
            return reply.status(404).send('Project manager not found')
        }
        // verify that the teamMember exist
        // and I'll send reply one of them is wrong
        const teamMembers = await User.find({ _id: { $in: request.body.teamMembers } })
        if (teamMembers.length !== request.body.teamMembers.length) {
            return reply.status(404).send('Team member not found')
        }

        // create the project
        const project = await Project(request.body)
        const result = await project.save()
        // return the project
        reply.send(result)

    } catch (error) {
        console.log({ error });
        reply.status(400).send({ message: error.message || "Invalid Project manager" })
    }
}

async function updateProject(request, reply) {
    try {
        // confirm that the projectManager id exists in the database
        // and is valid
        if (request.body.projectManager) {
            const projectManager = await User.findById(request.body.projectManager)
            if (!projectManager || !["Project manager", "Admin"].includes(projectManager.role)) {
                return reply.status(404).send('Project manager not found')
            }
        }
        // verify that the teamMember exist
        // and I'll send reply one of them is wrong
        if (request.body.teamMembers) {
            const teamMembers = await User.find({ _id: { $in: request.body.teamMembers } })
            if (teamMembers.length !== request.body.teamMembers.length) {
                return reply.status(404).send('Team member not found')
            }
        }
        const updateProject = await Project.findByIdAndUpdate(request.params.id, request.body, { new: true })
        if (!updateProject) {
            return reply.status(404).send({ message: 'Project not found' })
        }

        reply.send(updateProject)
    } catch (error) {
        reply.status(500).send(error)
    }
}

async function deleteProject(request, reply) {
    try {
        const project = await Project.findByIdAndDelete(request.params.id)
        console.log("Deleted project", project);
        
        if (!project) {
            return reply.status(404).send({ message: 'Project not found' })
        }

        reply.status(204).send("")
    } catch (error) {
        reply.status(500).send(error)
    }
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}