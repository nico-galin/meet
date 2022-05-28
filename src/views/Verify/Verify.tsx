import { useCallback, useEffect, useState } from 'react'

import {
  Box, Button, FormControl, FormErrorMessage, HStack, Input, Spinner, StackDivider, Text, VStack
} from '@chakra-ui/react'
import useAuth from 'contexts/auth/useAuth';
import { useForm } from 'react-hook-form';
import { supported_companies } from 'constants/supported_companies';
import useLocalStorage from 'hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

interface Props {}

const Verify = ({ }: Props) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  let localEmail = useLocalStorage("emailForLogin", null)

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = localEmail.toString();
      if (!email) {
        const res = window.prompt('Please provide your email for confirmation');
        email = !!res ? res : "";
      } 
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForLogin');
          navigate("/home");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [])
  return (
    <VStack marginTop="30vh"  alignItems="center">
      <Box minW="400px" padding="40px" width="min-content" height="max-content" bgColor="brand.secondaryBG" borderRadius="8px" borderWidth="1px" borderColor="brand.secondaryStroke">
        <Text fontSize="sm" color="brand.secondary">Welcome to Meet</Text>
        <Text fontSize="2xl" fontWeight="semibold">Verifying Your Email</Text>
        <StackDivider height="15px" />
        <StackDivider height="5px" />
        <HStack marginY="20px" width="100%" justifyContent="center">
          <Spinner size="md" />
        </HStack>
      </Box>
    </VStack>
  )
};

export default Verify;