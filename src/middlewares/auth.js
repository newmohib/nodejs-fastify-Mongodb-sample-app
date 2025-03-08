const User = require('../models/user.model');

require('dotenv').config();

async function apiKeyAuth(request, reply) {
    // get and head the api key will skip the auth
    if (request.method === 'GET' || request.method === 'HEAD') {
        return;
    }
    const apiKey = request.headers['x-api-key'];
    console.log("API Key:", apiKey);
    
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }
}

// basic auth
async function basicAuth(request, reply) {
    
    const authHeader = request.headers.authorization;
    console.log("Auth:", authHeader);
    
    // if (!authHeader || authHeader !== `Basic ${Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64')}`) {
    //     return reply.status(401).send({ error: 'Unauthorized' });
    // }

    if (!authHeader) {
        return reply.status(401).send({ error: 'Unauthorized' });
    }

    // const [email, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
    const [authType, authValue] = authHeader.split(' ');
    if (authType !== 'Basic') {
        return reply.status(401).send({ error: 'Requires basic authentication' });
    }
    
    const [email, password] = Buffer.from(authValue, 'base64').toString().split(':'); 

    try {
        const {isVerify, user, error} = await verifyUser({ email, password });
        if (!isVerify && error) {
            return reply.status(401).send({error });
        }
        request.user = user;
    } catch (error) {
        console.log(error);
        return reply.status(401).send({ error: 'An error occured during authentication' });
        
    }
}
async function verifyUser(params) {
    try {
        const { email, password } = params;
        // verify the user
        const user = await User.findOne({ email }).select(['password', 'role','email' ]);
        
        const isMatch = await user.comparePassword(password);
        if (!user || !isMatch) {
            return { isVerify: false,  error: 'Unauthorized'}
        }
        return { isVerify: true, user,  error: ''}
    } catch (error) {
        console.log(error);
        return { isVerify: false,  error: 'An error occured during authentication'}
        
    }
}
module.exports = {apiKeyAuth, basicAuth, verifyUser}