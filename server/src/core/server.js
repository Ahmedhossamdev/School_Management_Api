const dotenv = require('dotenv');
dotenv.config({
    path: 'config.env'
});

const app = require('./app.js');





// Start The Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});




process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1); // Terminate the process with a non-zero exit code
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Perform any necessary cleanup and error handling
    process.exit(1); // Terminate the process with a non-zero exit code
});

process.on('SIGTERM' , () => {
    console.log('SIGTERM RECEIVED, SHUTTING DOWN');
    server.close(() =>{
        console.log('Process terminated successfully');
    });
});