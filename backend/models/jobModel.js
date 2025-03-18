const mongoose= require("mongoose");

const jobSchema= new mongoose.Schema({
    jobName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        required: true
    },
    skillRequirements: {
        type: String,
        required: true
    },
    noOfApplicants: {
        type: Number
    },
    applyLink: {
        type: String,
        required: true
    }
})

module.exports= mongoose.model('Job',jobSchema);