const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
// config env wih dotenv .env file path is src/.env
require('dotenv').config();
const {apiKeyAuth, basicAuth} = require('./middlewares/auth');
// impurt the routes
const userRoutes = require('./routes/user.routes'); // ✅ Import the function correctly
const projectRoutes = require('./routes/project.routes');
// import the plugins
const jwtPlugin = require('./plugins/jwtPlugin');




// fastify.register(require('@fastify/jwt'), {
//     secret: process.env.JWT_SECRET,
//   });

fastify.register(jwtPlugin);

// Register the middleware
// fastify.addHook("preHandler", apiKeyAuth);
// fastify.addHook("preHandler", basicAuth);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Register the routes
fastify.register(userRoutes, { prefix: '/api/v1/users' });
fastify.register(projectRoutes, { prefix: '/api/v1/projects' });

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
