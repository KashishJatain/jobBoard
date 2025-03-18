import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Heading,
  Grid,
  Text,
  Center,
} from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "./Navbar"; 

const Home = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);

  return (
    <Box w="100vw" minH="100vh" py={10} bg="black" color="white">
      <Center> <Heading>MyJobFinder</Heading></Center>
      <Navbar />

      <Box display="flex" flexDirection="column" align="center" textAlign="center" mb={12} px={4}>
        <Heading size="3xl" fontWeight="bold">
          THE JOB FINDER
        </Heading>
        <Heading size="2xl">YOU'VE BEEN SEARCHING FOR</Heading>
        <Text fontSize="lg" mt={4} maxW="600px" m="auto">
          Why waste time searching? We post for you the perfect jobs. 
          No more back and forth. Get job today.
        </Text>
        <Button 
          bg="white" 
          color="black" 
          size="lg"
          width="400px"
          m="auto"
          mt="30px" 
          _hover={{ bg: "gray.300" }} 
          onClick={() => navigate(isAuth?.isAuth ? "/alljobs" : "/login")}
        >
          {isAuth?.isAuth ? "BROWSE JOBS" : "FIND YOUR DREAM JOB"}
        </Button>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6} mt={12} px={4}>
        {[
          { name: "Just signup to our website", color: "pink.300" },
          { name: "Browse through the jobs and find the best fit for you", color: "gray.300" },
          { name: "Apply as fast as possible", color: "beige" },
          { name: "Be two steps ahead of your peers", color: "yellow.300" },
        ].map((dev, index) => (
          <Box
            key={index}
            bg={dev.color}
            p={6}
            borderRadius="2xl"
            textAlign="center"
            color="black"
            shadow="lg"
          >
            
            <Box w="100px" h="100px" bg="gray.600" borderRadius="full" mx="auto" mb={4}></Box>
            <Text fontSize="xl" fontWeight="bold">{dev.name}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;