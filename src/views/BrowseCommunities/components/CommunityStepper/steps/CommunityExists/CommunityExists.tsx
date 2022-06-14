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
import ModalHeader from 'components/ModalHeader';

interface Props {
  useStepper: (...args: any) => any
}

const ConfirmCommunityDetails = ({ useStepper }: Props) => {
  const { setData, data, setStep, onExit } = useStepper();
  const { addCommunity } = useDatabase();
  const community = data.addCommunity;
  const handleSubmit = async () => {
    const resp = await addCommunity(data.addCommunity);
    if (resp === 337) {

    } else {
      onExit();
    }
  }

  return (
    <Stack spacing="20px" width="100%" textAlign="center" alignItems="start">
      <ModalHeader title="Duplicate" subtitle="This Community Already Exists" onExit={onExit} />
      <HStack>
        <Text fontSize="4xl">{community.emoji}</Text>
        <StackDivider width="3px" />
        <Box>
          <Text textAlign="left" fontWeight="semibold" fontSize="l">{community.name}</Text>
          <Text textAlign="left" fontSize="sm" color="brand.secondary">{community.region}</Text>
        </Box>
      </HStack>
      <HStack width="100%">
        <Button width="100%" onClick={() => setStep(Steps.ADD_COMMUNITY)}>Back</Button>
      </HStack>
    </Stack>
  )
}

export default ConfirmCommunityDetails;
