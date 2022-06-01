import { useCallback, useEffect, useState } from 'react'

import {
  Box, Button, FormControl, FormErrorMessage, HStack, Input, Spinner, Stack, StackDivider, Text, VStack
} from '@chakra-ui/react'
import useAuth from 'contexts/auth/useAuth';
import { useForm } from 'react-hook-form';
import { supported_companies } from 'constants/supported_companies';
import useLocalStorage from 'hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

interface Props {}

const Support = ({ }: Props) => {
  const { auth, verifyEmail } = useAuth();
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  return (
    <VStack marginTop="30vh"  alignItems="center">
      <Box minW="400px" padding="40px" width="min-content" height="max-content" bgColor="brand.secondaryBG" borderRadius="8px" borderWidth="1px" borderColor="brand.secondaryStroke">
        <Text fontSize="sm" color="brand.secondary">Having issues?</Text>
        <Text fontSize="2xl" fontWeight="semibold">Contact Us</Text>
        <StackDivider height="15px" />
        <StackDivider height="5px" />
        <Stack width="100%" justifyContent="center">
          <Text>via Discord: @Nique#9178</Text>
          <Text>via Email: nico.galin@gmail.com</Text>
        </Stack>
      </Box>
    </VStack>
  )
};

export default Support;