import { useCallback, useEffect, useState } from 'react'

import {
  Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Spinner, Stack, StackDivider, Text, VStack
} from '@chakra-ui/react'
import useAuth from 'contexts/auth/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { supported_companies } from 'constants/supported_companies';
import useLocalStorage from 'hooks/useLocalStorage';
import { formatName } from 'hooks/utils';
import VerifyUser from './components/VerifyUser';

const isValidEmail = (email: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

interface Props {}

const Login = ({ }: Props) => {
  const { signIn } = useAuth();
  const [localEmail, setLocalEmail] = useLocalStorage("emailForLogin", "");
  const [localWaiting, setLocalWaiting] = useLocalStorage("waitingForVerification", "0");
  const [waiting, setWaiting] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setWaiting(localWaiting === "1" ? true : false);
  }, [localWaiting])

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      company: ""
    }
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    handleSubmit((data) => {
      // View data on submission
      signIn(data.email);
      setLocalEmail(data.email);
      setLocalWaiting("1")
      setWaiting(true);
    })(e).catch((error) => {
      console.log(error)
    })
  }

  const handleResend = () => {
    setSpinning(true);
    signIn(localEmail);
    setTimeout(function () {
      setSpinning(false);
    }, 3000);
  }

  const handleReset = () => {
    setSpinning(false);
    setLocalEmail("");
    setLocalWaiting("0")
    setWaiting(false)
  }

  const companySupported = (email: string) => {
    for (let company of supported_companies) {
      for (let domain of company.email_domains) {
        if (email.toLowerCase().endsWith(domain.toLowerCase())) return true;
      }
    }
    return false;
  }

  const handleValidation = (email: string) => {
    return isValidEmail(email) //&& companySupported(email);
  }

  return (
    <VStack marginTop="30vh"  alignItems="center">
      <Box minW="400px" padding="40px" width="min-content" height="max-content" bgColor="brand.secondaryBG" borderRadius="8px" borderWidth="1px" borderColor="brand.secondaryStroke">
        <form onSubmit={onSubmit}>
          <Text fontSize="sm" color="brand.secondary">Welcome to Meet</Text>
          <Text fontSize="4xl" fontWeight="semibold">{waiting ? "Verify your email" : "Get Started"}</Text>
          <StackDivider height="15px" />
          {!waiting ?
            <>
              <FormControl isInvalid={!!errors.email}>
                <FormErrorMessage>{!!errors.email ? "Invalid or unsupported email" : ""}</FormErrorMessage>
                <StackDivider height="5px" />
                <Input {...register('email', { required: true, validate: handleValidation})} type="email" bgColor="brand.tertiaryBG" placeholder="Enter your email..."/>
              </FormControl>
              <StackDivider height="5px" />
              <Button type="submit" width="100%" paddingX="30px" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}} fontSize="sm" >Sign in</Button>
              <StackDivider height="5px" />
              <Text fontSize="xs" color="brand.secondary">*We use passwordless auth to verify your email</Text>
            </>
          :
            <VerifyUser onReset={handleReset} onResend={handleResend} spinning={spinning}/>
          }
        </form>
      </Box>
    </VStack>
  )
};

export default Login;
