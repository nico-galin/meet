import { useCallback, useEffect, useState } from 'react'

import {
  Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select, Spinner, Stack, StackDivider, Text, VStack
} from '@chakra-ui/react'
import useAuth from 'contexts/auth/useAuth';
import { Controller, useForm } from 'react-hook-form';
import { supported_companies } from 'constants/supported_companies';
import useLocalStorage from 'hooks/useLocalStorage';
import { formatName } from 'hooks/utils';

interface Props {
  onReset: () => void
  onResend: () => void
  spinning: boolean
}

const VerifyUser = ({ onReset, onResend, spinning }: Props) => {
  return (
    <>
      <Text fontSize="xs">Click the link in your inbox to verify</Text>
      <Text fontSize="xs">(Remember to check your spam folder)</Text>
      <StackDivider height="15px" />
      {spinning ?
        <Spinner size="xs"/>
      :
        <HStack>
          <Button onClick={onResend} fontSize="xs" textDecoration="underline" color="brand.secondary" padding="0" height="min-content" style={{ background: "transparent"}}>Resend Link</Button>
          <Button onClick={onReset} fontSize="xs" textDecoration="underline" color="brand.secondary" padding="0" height="min-content" style={{ background: "transparent"}}>Back</Button>
        </HStack>
      }
    </>
  )
};

export default VerifyUser;
