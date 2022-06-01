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
  const { auth, verifyEmail } = useAuth();
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      let localEmail:(string | undefined | null) = await window.localStorage.getItem("emailForLogin");
      localEmail = localEmail?.slice(1, localEmail.length - 1)
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localEmail?.toString();
        if (!!!email) {
          const res = window.prompt('Please provide your email for confirmation');
          email = !!res ? res : "";
          console.log(email)
        } 
        verifyEmail(email, window.location.href).then(() => {
          window.localStorage.setItem("emailForLogin", "");
          window.localStorage.setItem("waitingForVerification", "0");
          setFailed(false);
          navigate("/home");
        }).catch((e) => {
          console.log(e);
          setFailed(true);
        })
      } else {
        navigate("/login")
      }
    }
    setTimeout(function () {
      init();
    }, 1000);
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