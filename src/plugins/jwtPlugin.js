const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/jwt'), {
        secret: process.env.JWT_SECRET,
    });
    console.log("JWT Secret:", process.env.JWT_SECRET);

    fastify.decorate('jwtAuth', async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            reply.status(401).send({ error: 'Unauthorized' });
        }
    });
    // role based authorization
    fastify.decorate('hasRole', function (role) {
        console.log("TEst");
        
        return async function(request, reply) {
            console.log(request.user);
            
            try {
                const userRole = request.user.role;
                console.log("User role:", userRole);
                
                if (userRole !== role) {
                    return reply.status(403).send({ error: 'Forbidden. You do not have access to this resource' });
                }
            } catch (error) {
                reply.status(401).send({ error: "Forbidden" });
            }
        }

    });
});