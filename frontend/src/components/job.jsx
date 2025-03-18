import React, { useEffect, useState, useContext } from "react";
import { getJobBYIdApi, trackJobApplicationApi, getUserApplicationsApi } from "../apis";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, Spinner, Link, useToast } from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";

const Job = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuth } = useContext(AuthContext);

  const getJob = async () => {
    try {
      const res = await getJobBYIdApi(id);
      setJob(res.data.message || null);
    } catch (err) {
      console.log(err.response?.data);
      toast({
        title: "Error",
        description: "Failed to load job details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getJob();
  }, [id]);

  const handleApply = async () => {
    if (!isAuth?.isAuth) {
      toast({
        title: "Authentication required",
        description: "Please login to apply for jobs",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    // Track the application in user's profile
    try {
      await trackJobApplication(id);
    } catch (error) {
      console.error("Failed to track application", error);
      // Continue with redirect even if tracking fails
    }

    // Open the apply link in a new tab
    if (job.applyLink) {
      window.open(job.applyLink, "_blank");
      
      // Update applicant count locally for UI feedback
      setJob(prev => ({
        ...prev,
        noOfApplicants: prev.noOfApplicants + 1
      }));
      
      toast({
        title: "Application initiated",
        description: "You've been redirected to the application page",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Application link missing",
        description: "This job doesn't have a valid application link",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Function to track application in user profile for "My Applications" feature
  const trackJobApplication = async (jobId) => {
    try {
      // You'll need to implement this API endpoint
      const res = await trackJobApplicationApi(jobId);
      return res.data;
    } catch (error) {
      console.error("Error tracking application:", error);
      throw error;
    }
  };

  return (
    <Box w="100vw" minH="100vh" bg="black" color="white" py={6}>
      <Button 
        variant="ghost" 
        color="white" 
        _hover={{ bg: "gray.700" }} 
        onClick={() => navigate("/alljobs")}
      >
        Back
      </Button>
      <Box maxW="container.md" mx="auto" p={6} mt={6} boxShadow="xl" borderRadius="lg" bg="gray.900">
        {job ? (
          <VStack spacing={4} align="start">
            <Heading size="lg" color="blue.400">{job.company}</Heading>
            <Text fontSize="xl" fontWeight="bold">{job.jobName}</Text>
            <Text fontSize="md"><b>Location:</b> {job.location}</Text>
            <Text fontSize="md"><b>Salary:</b> {job.salary}</Text>
            <Text fontSize="md"><b>Description:</b> {job.description}</Text>
            <Text fontSize="md"><b>Skills Required:</b> {job.skillRequirements}</Text>
            <Text fontSize="md"><b>Eligibility:</b> {job.eligibility}</Text>
            <Text fontSize="md"><b>Applicants:</b> {job.noOfApplicants}</Text>
            
            <Button 
              colorScheme="blue" 
              size="lg" 
              _hover={{ boxShadow: "0px 0px 15px blue" }}
              onClick={handleApply}
            >
              Apply Now
            </Button>
          </VStack>
        ) : (
          <VStack>
            <Spinner size="xl" color="blue.400" />
            <Text>Loading job details...</Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default Job;