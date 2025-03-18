import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const toast = useToast();

  const handleLogout = () => {
    setIsAuth({
      isAuth: false,
      user: {}
    });
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <Flex justify="space-between" align="center" mb={10} px={4}>
      <HStack spacing={8}>
        <Button 
          variant="ghost" 
          color="white" 
          _hover={{ bg: "gray.700" }} 
          onClick={() => navigate("/about")}
        >
          About
        </Button>
        {isAuth?.isAuth ? (
          <>
          <Button 
            variant="ghost" 
            color="white" 
            _hover={{ bg: "gray.700" }} 
            onClick={() => navigate("/alljobs")}
          >
            Browse Jobs
          </Button><Button 
              variant="ghost" 
              color="white" 
              onClick={() => navigate("/applications")}
              _hover={{ bg: "gray.700" }}
            >
              My Applications
            </Button>
            </>
        ) : null}
        
            
      </HStack>
      
      <HStack spacing={4}>
        {isAuth?.isAuth ? (
          <>
            <Button 
              bg="white" 
              color="black" 
              _hover={{ bg: "gray.200" }} 
              onClick={() => navigate("/postjob")}
            >
              Post Job
            </Button>
            <Button 
              variant="outline" 
              color="white" 
              _hover={{ bg: "red.800" }} 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="ghost" 
              color="white" 
              _hover={{ bg: "gray.700" }} 
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button 
              variant="ghost" 
              color="white" 
              _hover={{ bg: "gray.700" }} 
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;