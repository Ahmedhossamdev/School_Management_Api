const mongoose = require("mongoose");


const db = () => {
    try{
        const connection = mongoose.connect(process.env.MONGODB_URI);
        console.log('Database Connection successfully');
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = db;