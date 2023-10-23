const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_CLIENT,
    port: 16068,
    password: process.env.REDIS_SECRET,
});

if (process.env.NODE_ENV !== 'test') {
    client.on('connect', () => {
        console.log("Redis is here...");
    });

    client.on('ready', () => {
        console.log("Client connected to redis and ready to use..");
    });

    client.on('error', (err) => {
        console.log(err.message);
    });

    client.on('end', () => {
        console.log("Client disconnected from redis");
    });

    process.on('SIGINT', () => {
        client.quit();
    });
}

module.exports = client;
