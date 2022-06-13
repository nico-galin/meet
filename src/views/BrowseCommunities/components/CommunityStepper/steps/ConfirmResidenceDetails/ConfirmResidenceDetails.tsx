import { useEffect } from 'react'
import { Box, Button, Checkbox, Container, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, InputGroup, Select, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import DataCard from 'components/DataCard';
import GroupChatCard from 'components/GroupChatCard';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { format } from 'util';
import { Controller, useForm } from 'react-hook-form';
import { Steps } from '../../CommunityStepper';
import { formatAddress } from 'hooks/utils';
import useDatabase from 'contexts/database/useDatabase';

interface Props {
  useStepper: (...args: any) => any
}

const ConfirmResidenceDetails = ({ useStepper }: Props) => {
  const { setData, data, setStep, onExit } = useStepper();
  const { addResidence } = useDatabase();

  const handleSubmit = async () => {
    await addResidence(data.addResidence);
    onExit();
  }

  return (
    <Stack spacing="20px" width="100%" textAlign="center" alignItems="start">
      <Box>
        <Text textAlign="left" fontWeight="semibold" fontSize="2xl">Confirm Details</Text>
        <Text textAlign="left" fontSize="md" color="brand.secondary">(Make sure this is all correct)</Text>
      </Box>
      <Box>
        <Text textAlign="left" fontWeight="semibold" fontSize="l">{data.addResidence.name}</Text>
        <Text textAlign="left" fontSize="sm" color="brand.secondary">{formatAddress(data.addResidence)}</Text>
      </Box>
      <Box justifyContent="left">
        <Text textAlign="left" fontWeight="semibold" fontSize="l" marginBottom="4px">Group Chats</Text>
        {data?.addResidence?.group_chats?.map((gc: GroupChat, ind: number) => (
          <GroupChatCard key={ind} groupChat={gc} size="sm" />
        ))}
      </Box>
      <HStack width="100%">
        <Button onClick={() => setStep(Steps.VIEW_GROUP_CHATS)}>Back</Button>
        <Button onClick={handleSubmit} flex="1" width="100%" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Continue</Button>
      </HStack>
    </Stack>
  )
}

export default ConfirmResidenceDetails;
