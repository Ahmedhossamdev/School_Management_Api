require("dotenv").config();
const bodyParser = require('body-parser');
const db = require("../config/db");
const AppError = require("../shared/utlis/appError");
const globalErrorHandler = require('../shared/utlis/error.handling');
const express = require('express');
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Database connection here
db();




// public middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// Routes

const authRouter = require("./../modules/auth/auth.routes");
const schoolRouter = require("./../modules/school/school.routes");
const studentRouter = require("./../modules/student/student.routes");
const userRouter = require("./../modules/user/user.routes");
const classRoomRouter = require("./../modules/classroom/classRoom.routes");



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/school', schoolRouter);
app.use('/api/v1/student' , studentRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/classroom', classRoomRouter);


// Unhandled routes
app.use("*", (req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} dose not exist`, 400));
});


// Error Handling middleware
app.use(globalErrorHandler);

// 4) Start Server
module.exports = app;
