import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  VStack,
  Text,
  SimpleGrid,
  Container,
  Card,
  CardBody,
  Button,
} from "@chakra-ui/react";
import { getJobsApi } from "../apis";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const getJobs = async () => {
    try {
      const res = await getJobsApi();
      setJobs(res.data.message || []);
    } catch (err) {
      console.log(err.response?.data?.message || "Error fetching jobs");
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  
  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.jobName.toLowerCase().includes(search.toLowerCase())
  );

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
      <Container maxW="container.lg">
        <VStack spacing={4} align="start">
          <Heading size="lg" color="white.400">
            All Jobs
          </Heading>
          <Input
            placeholder="Search jobs by company or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="lg"
            borderRadius="md"
            bg="gray.800"
            color="white"
            border="none"
            _focus={{ borderColor: "white.400", boxShadow: "0 0 10px white" }}
          />
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <Card
                key={index}
                p={4}
                shadow="lg"
                borderRadius="lg"
                bg="gray.900"
                _hover={{ shadow: "xl", transform: "scale(1.02)", border: "1px solid white" }}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => navigate(`/alljobs/${job._id}`)}
              >
                <CardBody>
                  <Heading size="md" color="blue.400">
                    {job.company}
                  </Heading>
                  <Text fontWeight="bold" color="white">Job Name: {job.jobName}</Text>
                  <Text color="white">Location: {job.location}</Text>
                  <Text color="white">Salary: {job.salary}</Text>
                </CardBody>
              </Card>
            ))
          ) : (
            <Text>No jobs found</Text>
          )}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AllJobs;
