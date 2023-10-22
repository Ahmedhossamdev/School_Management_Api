const redis = require('redis');

const client = redis.createClient({

    host: 'redis-16068.c17.us-east-1-4.ec2.cloud.redislabs.com',
    port: 16068,
    password: process.env.REDIS_SECRET,

});

client.on('connect' , () =>{
    console.log("Redis is here...");
});

client.on('ready' , () =>{
    console.log("Client connected to redis and ready to use..")
});

client.on('error' , (err) =>{
    console.log(err.message);
});

client.on('end' , () =>{
    console.log("Client disconnected from redis");
});

process.on('SIGINT', () =>{
    client.quit();
})

module.exports = client;