const jwt=require("jsonwebtoken");
const User= require('../models/userModel');
const Job= require('../models/jobModel')
const bcrypt= require('bcrypt');

const registerUser= async(req, res)=>{
    const {userName, email, password}= req.body;
    const user= await User.findOne({email});
    if(user){
        return res.status(400).send({message: "User already exist", error: true});
    }
    bcrypt.hash(password, 5, async(err, hashedPassword)=>{
        if(err){
            return res.status(500).send({ message: err.message, error: true});
        }
        const user= await new User({
            userName,
            email,
            password: hashedPassword
        });
        console.log(user);
        await user.save();
        return res.status(200).send({message: user, error: false});
    })
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).send({ message: "Please create an account", error: true });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid credentials", error: true });
        }
        
        const token = jwt.sign(
            { 
                email: user.email,
                _id: user._id 
            },
            process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );
        
        const { password: _, ...userDataWithoutPassword } = user._doc;
        
        let cookieOptions = {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
        };
        
        res.cookie('access_token', token, cookieOptions);
        return res.status(200).send({ 
            message: userDataWithoutPassword, 
            token,
            error: false 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message, error: true });
    }
}
const trackJobApplication = async (req, res) => {
    try {
      const { jobId } = req.params;
      const userId = req.user._id;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found", error: true });
      }
      
     
      if (user.applications.includes(jobId)) {
        return res.status(200).send({ message: "Application already tracked", error: false });
      }
      
      
      user.applications.push(jobId);
      await user.save();
      
      
      const job = await Job.findById(jobId);
      if (job) {
        job.noOfApplicants += 1;
        await job.save();
      }
      
      return res.status(200).send({ message: "Application tracked successfully", error: false });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error tracking application", error: true });
    }
  };
  
 
  const getUserApplications = async (req, res) => {
    try {
      const userId = req.user._id; 
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found", error: true });
      }
      
     
      const applications = await Job.find({ _id: { $in: user.applications } });
      
      return res.status(200).send({ message: applications, error: false });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Error fetching applications", error: true });
    }
  };

module.exports= { registerUser, loginUser, trackJobApplication, getUserApplications};