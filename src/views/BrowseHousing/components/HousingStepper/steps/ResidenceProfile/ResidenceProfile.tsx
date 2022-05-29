import { useEffect } from 'react'
import { Box, Button, Container, Flex, Heading, HStack, Image, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import DataCard from 'components/DataCard';
import GroupChatCard from 'components/GroupChatCard';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { format } from 'util';

interface Props {
  useStepper: () => any
}

const EntryStep = ({ useStepper }: Props) => {
  const { onNextStep, data } = useStepper();
  const { user } = useAuth();
  const formattedCompanyName = `${user?.company_name.slice(0, 1).toUpperCase()}${user?.company_name.slice(1)}`
  useEffect(() => {
  }, [onNextStep])
  
  return (
      <Stack spacing="20px" width="100%" textAlign="center" alignItems="start">
        <Box>
          <Text textAlign="left" fontWeight="semibold" fontSize="2xl">{data.name}</Text>
          <Text textAlign="left" fontSize="sm" color="brand.secondary">{data.address}, {data.city}, {data.state} {data.zip}</Text>
        </Box>
        <HStack spacing="30px" alignItems="start">
          <Stack flex="1">
            <Image flex="1" src={data.photo_uri} fit="cover" borderRadius="15px"/>
            <HStack>
              <DataCard size="sm" label={`${formattedCompanyName} Employees`} data={"0"} />
              <DataCard size="sm" label="Total Residents" data={"0"} />
            </HStack>
            {/*}
            <Button width="100%" fontWeight="xs" bgColor="brand.tertiaryBG" borderWidth="1px" borderColor="brand.tertiaryStroke">
              <Text fontSize="sm">Load Ratings</Text>
            </Button>
            */}
          </Stack>
          <Stack spacing="15px" flex="1">
            <Stack flex="1" textAlign="left">
              <Box>
                <Text fontSize="xl" fontWeight="semibold">{formattedCompanyName} Group Chats</Text>
                <Text fontSize="sm" color="brand.secondary">Only for {formattedCompanyName} Employees</Text>
              </Box>
              <Stack>
                {data.group_chats.filter((gc: GroupChat) => (gc.restricted && gc.company === user?.company_name)).map((gc: GroupChat, ind: number) => (
                  <GroupChatCard groupChat={gc} />
                ))}
              </Stack>
            </Stack>
            <Stack flex="1" textAlign="left">
              <Box>
                <Text fontSize="xl" fontWeight="semibold">General Group Chats</Text>
                <Text fontSize="sm" color="brand.secondary">For Everyone</Text>
              </Box>
              <Stack>
                {data.group_chats.filter((gc: GroupChat) => (!gc.restricted && gc.company !== user?.company_name)).map((gc: GroupChat, ind: number) => (
                  <GroupChatCard groupChat={gc} />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </HStack>
        <Button width="100%" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}></Button>
      </Stack>
  )
}

export default EntryStep
