import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signupApi } from "../apis";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [creds, setCreds] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res= await signupApi(creds);
    toast({
      title: "Signup Successful",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login");
  } catch(err){
    console.log(err);
  }
  };

  return (
    <Box w="100vw" minH="100vh" py={10} bg="black" color="white">
      <Box bg="black" color="white" p={6} boxShadow="lg" borderRadius="md" w="40vw" m="auto">
        <Heading size="lg" textAlign="center" mb={6}>
          Sign Up
        </Heading>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="userName"
              placeholder="Enter your name"
              value={creds.name}
              onChange={handleChange}
              bg="gray.800"
              border="1px solid white"
              color="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={creds.email}
              onChange={handleChange}
              bg="gray.800"
              border="1px solid white"
              color="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              value={creds.password}
              onChange={handleChange}
              bg="gray.800"
              border="1px solid white"
              color="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={creds.confirmPassword}
              onChange={handleChange}
              bg="gray.800"
              border="1px solid white"
              color="white"
            />
          </FormControl>
          <Button type="submit" colorScheme="whiteAlpha" size="lg" w="200px">
            Sign Up
          </Button>
          <Text fontSize="sm">
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.300"
              cursor="pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Signup;
