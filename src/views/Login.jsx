import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
  Flex,
  Button,
  Input,
  Container,
  Grid,
  Icon,
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';

import logo from '../assets/MicrosoftTeams-image (4).png';
import { FiEyeOff } from 'react-icons/fi';

function Login() {
  const [user, setUser] = useState({
    surel: '',
    sandi: '',
  });
  const { register, handleSubmit } = useForm(user);
  const [show, setShow] = useState(false);
  const toggleShow = () => {
    setShow(show ? false : true);
  };
  const createLogin = async () => {
    const response = 
    axios
      .put(
        'https://wwb6j89602.execute-api.ap-southeast-1.amazonaws.com/dev/user/login',
        user
      )
      .then((response) => {
        return response;
      })
      .then((data) => {
        const token = data.data.data;
        localStorage.setItem('token', token);
        console.log(token);
        window.location.href = '/home';
      });

  }
  const mutation = useMutation((user) => {
    console.log(user, 'cek user');
    
  });

  const onSubmit = () => {
    // if (user.sandi === '' || user.surel === '') {
    //   return alert('Email or password cannot be empty!');
    // } else if (!/\S+@\S+\.\S+/.test(user.surel)) {
    //   return alert('Email address is invalid');
    // }
    // e.preventDefault();
    mutation.mutate(user);
  };

  return (
    <Box minH={['container.sm', 'container.md', 'container.lg']}>
      <Flex>
        <VStack width="50%" position="relative">
          <Box
            bgImage="url(https://res.cloudinary.com/doqopynok/image/upload/v1635655495/MicrosoftTeams-image_2_ykix9n.png)"
            width="full"
            height="full"
            minH={['container.sm', 'container.md', 'container.lg']}
            bgSize="cover"
            objectPosition="center"
          >
            <Image src={logo} py="10" />
            <Grid pt="20" pb="96" gridTemplateColumns="repeat(5, 1fr)" px="5">
              <Box>
                <Text
                  fontSize="1xl"
                  fontWeight="bold"
                  color="white"
                  textAlign="left"
                >
                  Welcome Back to,
                </Text>
                <Text
                  fontSize="4xl"
                  fontWeight="bold"
                  color="white"
                  textAlign="left"
                >
                  E-Materai Distribution System
                </Text>
              </Box>
            </Grid>
          </Box>
        </VStack>
        <VStack
          backgroundColor="#F6F6F6"
          width="50%"
          alignItems="center"
          justifyContent="center"
          as="section"
        >
          <Container maxWidth="60%">
            <Text fontSize="2xl" fontWeight="bold">
              Sign In
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl pb="5">
                <FormLabel color="#B6B9BF" fontSize="sm" pt="6">
                  Email
                </FormLabel>
                <Input
                  placeholder="Email"
                  bgColor="#FFFFFF"
                  {...register('surel').user}
                  variant="unstyled"
                  px="2"
                  py="2"
                />
                <FormLabel color="#B6B9BF" fontSize="sm" py="2">
                  Password
                </FormLabel>
                <Flex flexDirection="row" bgColor="#FFFFFF" mb="5">
                  <Input
                    placeholder="Password"
                    type={show ? 'text' : 'password'}
                    bgColor="transparent"
                    border="none"
                    {...register('sandi').user}
                    variant="unstyled"
                    px="2"
                    py="2"
                  />
                  <Icon
                    as={FiEyeOff}
                    onClick={toggleShow}
                    boxSize={5}
                    mt={2.5}
                    mr={3}
                    color="grey"
                  />
                </Flex>

                <Button
                  bgColor="#2C8CCB"
                  color="#FFFFFF"
                  alignContent="center"
                  type="submit"
                >
                  Sign In
                </Button>
              </FormControl>
            </form>

            <Text color="#2C8CCB" py="2" textAlign="center">
              Forgot Password?
            </Text>
          </Container>
        </VStack>
      </Flex>
    </Box>
  );
}

export default Login;
