const express = require('express');
const app = express.Router();
const { postJob, getAllJobs, getJobById }= require("../controllers/jobController")
app.post("/create",postJob);
app.get("/",getAllJobs);
app.get("/:id",getJobById);

module.exports=app;