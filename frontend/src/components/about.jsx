import React from "react";
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate= useNavigate();
  return (
    <Box w="100vw" minH="100vh" bg="black" color="white" py={8}>
      <Button 
                variant="ghost" 
                color="white" 
                _hover={{ bg: "gray.700" }} 
                onClick={() => navigate("/")}
              >
                Home
              </Button>
      <Container maxW="container.md">
        <Box bg="gray.900" p={6} boxShadow="xl" borderRadius="lg">
          <VStack spacing={4} textAlign="center">
            <Heading size="lg" color="blue.400">
              About MyJobFinder
            </Heading>
            <Text fontSize="lg">
              Welcome to <b>MyJobFinder</b>, your one-stop destination for finding the perfect job or hiring top talent. 
              We connect job seekers with employers by providing a simple, fast, and efficient job search experience.
            </Text>
            <Text fontSize="md" color="gray.300">
              Our mission is to bridge the gap between companies and talented individuals by offering a streamlined job 
              posting and application process.
            </Text>
            <Text fontSize="md" color="gray.300">
              Whether you're a <b>recent graduate</b>, a <b>seasoned professional</b>, or a <b>company looking for skilled employees</b>, 
              MyJobFinder makes the hiring process easier.
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="blue.400">
              Start your journey with us today!
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
