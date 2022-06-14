import { useEffect } from 'react'
import { Box, Button, Checkbox, Container, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, InputGroup, Select, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import DataCard from 'components/DataCard';
import GroupChatCard from 'components/GroupChatCard';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { format } from 'util';
import { Controller, useForm } from 'react-hook-form';
import { Steps } from '../../CommunityStepper';

interface Props {
  useStepper: (...args: any) => any
}

const ViewGroupChats = ({ useStepper }: Props) => {
  const { setData, data, setStep } = useStepper();

  const handleDelete = (ind: number) => {
    setData((prev: any) => ({
      ...prev,
      addResidence: {
        ...prev.addResidence,
        group_chats: prev.addResidence.group_chats.filter((gc: GroupChat, gcInd: number) => gcInd !== ind)
      }
    }))
  }

  return (
    <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
      <Box>
        <Text textAlign="left" fontWeight="semibold" fontSize="2xl">Add group chats for {data.addResidence.name}</Text>
        <Text textAlign="left" fontSize="sm" color="brand.secondary">(Try to limit the total number of chats)</Text>
      </Box>
      <Box width="100%" justifyContent="center">
        <Stack margin="auto" spacing="20px">
          {data?.addResidence?.group_chats?.map((gc: GroupChat, ind: number) => (
            <GroupChatCard key={ind} groupChat={gc} onDelete={() => handleDelete(ind)}/>
          ))}
          {!(data?.addResidence?.group_chats?.length > 0) && <Button disabled>No group chats yet</Button>}
          {/*<Button variant="link" width="min-content" justifyContent="start" padding="0" color="brand.secondary" fontWeight="sm" fontSize="xs" onClick={() => setStep(Steps.ADD_GROUP_CHAT)}>Add group chat</Button>*/}
        </Stack>
      </Box>
      <HStack width="100%">
        {/*<Button onClick={() => !!data.addResidence ? setStep(Steps.ADD_RESIDENCE_PHOTO) : setStep(Steps.COMMUNITY_PROFILE)}>Back</Button>
        <Button onClick={() => setStep(Steps.CONFIRM_ADD_HOUSING)} flex="1" width="100%" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Continue</Button>
          */}</HStack>
    </Stack>
  )
}

export default ViewGroupChats;
