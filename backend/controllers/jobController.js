const Job= require('../models/jobModel');

const postJob = async(req, res, next) => {
    try {
        const { jobName, company, location, salary, description, eligibility, skillRequirements, noOfApplicants=0, applyLink} = req.body;
        const job = new Job({
            jobName, company, location, salary, description, eligibility, skillRequirements, noOfApplicants, applyLink
        });
        await job.save();
        return res.status(201).send({message: job, error: false});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: "Error creating job", error: true});
    }
}
const getAllJobs= async(req, res)=>{
    const job= await Job.find();
    if(!job)
        return res.status(404).send({message: "No job found", error: true});
    return res.status(200).send({message: job, error: false});
}

const getJobById= async(req, res)=>{
    try{const { id }= req.params;
    const job= await Job.findById(id);
    if(!job){
        return res.status(404).send({message: "No job found", error: true});
    }
    return res.status(200).send({message: job, error: false});
}catch(err){
    return res.status(500).send({message: "error", error: true});
}
}

module.exports= { postJob, getAllJobs, getJobById};