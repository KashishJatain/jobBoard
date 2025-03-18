import React, { useState } from "react";
import { postJobApi } from "../apis";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Heading,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const init = {
    jobName: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    eligibility: "",
    skillRequirements: "",
    applyLink: "",
  };

  const [creds, setCreds] = useState(init);
  const toast = useToast();
    const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCreds({
      ...creds,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(creds);
      const res = await postJobApi(creds);
      setCreds(init);
      console.log(res);
      toast({
        title: "Job Posted!",
        description: "Your job has been successfully posted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err.response?.data?.message);
      toast({
        title: "Error",
        description: "Failed to post job.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100vw" minH="100vh" py={10} bg="black" color="white">
      <Button 
                      variant="ghost" 
                      color="white" 
                      _hover={{ bg: "gray.700" }} 
                      onClick={() => navigate("/")}
                    >
                      Home
                    </Button>
      <Box w="100%" maxW="600px" bg="gray.900" p={8} borderRadius="lg" boxShadow="lg" m="auto">
        <Heading size="lg" textAlign="center" mb={6} color="white.400">
          Post a Job
        </Heading>
        <VStack spacing={4} as="form">
          <FormControl>
            <FormLabel color="white.400">Job Name</FormLabel>
            <Input bg="gray.800" color="white" border="none" _focus={{ borderColor: "white.400" }} type="text" name="jobName" placeholder="Job Name" value={creds.jobName} onChange={changeHandler} />
          </FormControl>
          <FormControl>
            <FormLabel color="white.400">Company Name</FormLabel>
            <Input bg="gray.800" color="white" border="none" _focus={{ borderColor: "white.400" }} type="text" name="company" placeholder="Company Name" value={creds.company} onChange={changeHandler} />
          </FormControl>
          <FormControl>
            <FormLabel color="white.400">Location</FormLabel>
            <Input bg="gray.800" color="white" border="none" _focus={{ borderColor: "white.400" }} type="text" name="location" placeholder="Location" value={creds.location} onChange={changeHandler} />
          </FormControl>
          <FormControl>
            <FormLabel color="white.400">Salary</FormLabel>
            <Input bg="gray.800" color="white" border="none" _focus={{ borderColor: "white.400" }} type="text" name="salary" placeholder="Salary" value={creds.salary} onChange={changeHandler} />
          </FormControl>
          <FormControl>
            <FormLabel color="white.400">Description</FormLabel>
            <Textarea bg="gray.800" color="white" border="none" _focus={{ borderColor: "white.400" }} name="description" placeholder="Job Description" value={creds.description} onChange={changeHandler} />
          </FormControl>
          <FormControl>
            <FormLabel color="white.400">Eligibility</FormLabel>
            <Input bg="gray.800" color="white" border="none" _focus={{ borderColor: "white.400" }} type="text" name="eligibility" placeholder="Eligibility" value={creds.eligibility} onChange={changeHandler} />
          </FormControl>
          <FormControl>
            <FormLabel color="white.400">Skill Requirements</FormLabel>
            <Input bg="gray.800" color="white" border="none" _focus={{ borderColor: "white.400" }} type="text" name="skillRequirements" placeholder="Skill Requirements" value={creds.skillRequirements} onChange={changeHandler} />
          </FormControl>
          <FormControl>
            <FormLabel color="white.400">Apply Link</FormLabel>
            <Input bg="gray.800" color="white" border="none" _focus={{ borderColor: "white.400" }} type="text" name="applyLink" placeholder="Put apply link here" value={creds.applyLink} onChange={changeHandler} />
          </FormControl>
          <Button bg="white" color="black" size="lg" onClick={submitHandler} w="full">
            Post Job
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default PostJob;
