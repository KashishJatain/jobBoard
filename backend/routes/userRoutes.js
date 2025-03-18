const express= require("express");
const app= express.Router();
const{ registerUser, loginUser, trackJobApplication, getUserApplications}= require("../controllers/userController");
const authmiddleware = require('../middleware/auth');
app.post('/signup',registerUser);
app.post('/login',loginUser);
app.post('/track-application/:jobId', authmiddleware, trackJobApplication);
app.get('/applications', authmiddleware, getUserApplications);

module.exports= app;