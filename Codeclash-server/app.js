const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const chatRoutes = require('./routes/Chat/chatRoutes');
const messageRoutes = require('./routes/Chat/messageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fileUpload = require('express-fileupload');
const reportRoutes = require('./routes/reportRoutes');
const ctfRoutes = require('./routes/ctfRoutes');
const contestRoutes = require('./routes/contestRoutes');

const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Middle ware for cors permission
app.use(cors());

//Converting req in json format
app.use(express.json());

//For cookies
app.use(cookieParser());

//Max 10kb size of input user can give
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//User Routes
app.use('/v1/users', userRouter);
app.use('/v1/chat', chatRoutes);
app.use('/v1/message', messageRoutes);
app.use('/v1/admin', adminRoutes);
app.use('/v1/report', reportRoutes);
app.use('/v1/ctf', ctfRoutes);
app.use('/v1/contest', contestRoutes);

//Route of global error handler
app.use(globalErrorController);

module.exports = app;
