const fastify = require('fastify')({ logger: true });
const userRoutes = require('./routes/user.routes'); // ✅ Import the function correctly

// Register the routes
fastify.register(userRoutes, { prefix: '/api/v1/users' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
