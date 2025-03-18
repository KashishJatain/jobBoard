import React, { useState, useContext } from "react";
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
import { AuthContext } from "../Context/AuthContext"
import { loginApi } from "../apis";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const toast = useToast();
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(creds);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsAuth({
        isAuth: true,
        user: res.data.message
      });
      navigate("/"); 
    } catch (err) {
      toast({
        title: "Invalid Credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100vw" minH="100vh" py={10} bg="black" color="white">
      <Box bg="black" color="white" p={6} boxShadow="lg" borderRadius="md" w="40vw" m="auto">
        <Heading size="lg" textAlign="center" mb={6}>
          Login
        </Heading>
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={creds.email}
              onChange={handleChange}
              bg="gray.800"
              w="500px"
              border="1px solid white"
              color="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={creds.password}
              onChange={handleChange}
              bg="gray.800"
              w="500px"
              border="1px solid white"
              color="white"
            />
          </FormControl>
          <Button type="submit" colorScheme="whiteAlpha" size="lg" w="200px">
            Login
          </Button>
          <Text fontSize="sm">
            Don't have an account?{" "}
            <Text
              as="span"
              color="blue.300"
              cursor="pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;