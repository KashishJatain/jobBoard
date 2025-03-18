import React, { useEffect, useState, useContext } from "react";
import { getUserApplicationsApi } from "../apis";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Spinner, 
  Grid, 
  GridItem, 
  Badge,
  Flex,
  useToast,
  Link
} from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "./Navbar";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuth } = useContext(AuthContext);

  const fetchApplications = async () => {
    try {
      const res = await getUserApplicationsApi();
      setApplications(res.data.message || []);
      setLoading(false);
    } catch (err) {
      console.log(err.response?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuth?.isAuth) {
      navigate("/login");
      return;
    }
    fetchApplications();
  }, [isAuth]);

  const viewJobDetails = (id) => {
    navigate(`/job/${id}`);
  };


  return (
    <Box w="100vw" minH="100vh" bg="black" color="white" py={6}>
      <Button 
                      variant="ghost" 
                      color="white" 
                      _hover={{ bg: "gray.700" }} 
                      onClick={() => navigate("/")}
                    >
                      Home
                    </Button>
      
      <Box maxW="container.xl" mx="auto" p={6}>
        <Heading mb={6}>My Applications</Heading>
        
        {loading ? (
          <Flex justify="center" align="center" h="50vh">
            <VStack>
              <Spinner size="xl" color="blue.400" />
              <Text>Loading your applications...</Text>
            </VStack>
          </Flex>
        ) : applications.length === 0 ? (
          <Box textAlign="center" p={8} bg="gray.900" borderRadius="lg">
            <Heading size="md" mb={4}>You haven't applied to any jobs yet</Heading>
            <Button 
              colorScheme="blue" 
              onClick={() => navigate("/alljobs")}
            >
              Browse Jobs
            </Button>
          </Box>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            {applications.map((job) => (
              <GridItem key={job._id}>
                <Box 
                  p={6} 
                  bg="gray.900" 
                  borderRadius="lg" 
                  boxShadow="lg"
                  borderLeft="4px solid"
                  borderColor="blue.400"
                  transition="transform 0.2s"
                  _hover={{ transform: "translateY(-5px)" }}
                >
                  <Heading size="md" color="blue.400" mb={2}>{job.company}</Heading>
                  <Text fontWeight="bold" mb={2}>{job.jobName}</Text>
                  <Text fontSize="sm" mb={2}><b>Location:</b> {job.location}</Text>
                  <Text fontSize="sm" mb={2}><b>Salary:</b> {job.salary}</Text>
                  <Flex mt={4} justify="space-between" align="center">
                    <Badge colorScheme="green">Applied</Badge>
                    <Box>
                      <Button 
                        size="sm" 
                        colorScheme="blue"
                        mr={2}
                        onClick={() => viewJobDetails(job._id)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Flex>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default MyApplications;