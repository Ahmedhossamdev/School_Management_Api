const https = require('https');

const pingServer = () => {
    const url = 'https://school-mangment-system.onrender.com/';

    const req = https.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log('Server pinged successfully');
        } else {
            console.error(`Server ping failed with status code: ${res.statusCode}`);
        }
    });

    req.on('error', (error) => {
        console.error('An error occurred while pinging the server:', error);
    });

    req.end();
};

// Define the interval (in milliseconds) at which you want to ping the server
const intervalTime = 5000;

// Set up the timer to ping the server at regular intervals
const interval = setInterval(pingServer, intervalTime);

// If you want to stop the timer after a certain period, you can use setTimeout
// For example, to stop the timer after 1 hour (3600000 milliseconds):
// setTimeout(() => clearInterval(interval), 3600000);
