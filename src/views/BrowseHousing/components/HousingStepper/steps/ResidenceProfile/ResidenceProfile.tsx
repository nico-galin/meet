import { useCallback, useEffect, useMemo } from 'react'
import { Box, Button, Container, Flex, Heading, HStack, Image, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import DataCard from 'components/DataCard';
import GroupChatCard from 'components/GroupChatCard';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { format } from 'util';
import { Steps } from '../../HousingStepper';
import { formatAddress, formatName } from 'hooks/utils';
import useDatabase from 'contexts/database/useDatabase';
import { Resident } from 'models/Residence';
import { useNavigate } from 'react-router-dom';

interface Props {
  useStepper: () => any
}

const ResidenceProfile = ({ useStepper }: Props) => {
  const navigate = useNavigate();
  const { onNextStep, data, setStep } = useStepper();
  const { deleteGroupChat, joinResidence, leaveResidence } = useDatabase();
  const residence = data.residence;
  const { user, isAuthenticated } = useAuth();
  const formattedCompanyName = formatName(user?.company_name);

  useEffect(() => {
  }, [onNextStep])
  
  const handleAddGC = () => {
    if (isAuthenticated) {
      setStep(Steps.ADD_GROUP_CHAT)
    } else {
      navigate("/login");
    }
  }

  const handleJoin = () => {
    if (isAuthenticated) {
      setStep(Steps.JOIN_RESIDENCE)
    } else {
      navigate("/login");
    }
  }

  const companyResidents = useMemo(() => residence.group_chats.filter((gc: GroupChat) => (gc.restricted && gc.company === user?.company_name)), [residence])

  return (
      <Stack spacing="20px" width="100%" textAlign="center" alignItems="start">
        <Box>
          <Text textAlign="left" fontWeight="semibold" fontSize="2xl">{residence.name}</Text>
          <Text textAlign="left" fontSize="sm" color="brand.secondary">{formatAddress(residence)}</Text>
        </Box>
        <HStack spacing="30px" alignItems="start">
          <Stack flex="1">
            <Image flex="1" src={residence.photo_uri} fit="cover" borderRadius="15px"/>
            <HStack>
              <DataCard size="sm" label={`${formattedCompanyName} Coworkers`} data={isAuthenticated ? companyResidents.length : "?"} />
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
                <Text fontSize="xl" fontWeight="semibold">{!!formattedCompanyName ? formattedCompanyName : "Company"} Group Chats</Text>
                {!!formattedCompanyName ? 
                  <Text fontSize="sm" color="brand.secondary">Only for {formattedCompanyName} Employees</Text>
                :
                  <Text fontSize="sm" color="brand.secondary">Login to view</Text>
                }
              </Box>
              <Stack>
                {companyResidents.map((gc: GroupChat, ind: number) => (
                  <GroupChatCard key={`co${ind}`} groupChat={gc} onDelete={gc.creatorId === user?.id ? () => deleteGroupChat(gc) : undefined}/>
                ))}
              </Stack>
            </Stack>
            <Stack flex="1" textAlign="left">
              <Box>
                <Text fontSize="xl" fontWeight="semibold">General Group Chats</Text>
                <Text fontSize="sm" color="brand.secondary">For Everyone</Text>
              </Box>
              <Stack>
                {residence.group_chats.filter((gc: GroupChat) => !gc.restricted).map((gc: GroupChat, ind: number) => (
                  <GroupChatCard key={`glo${ind}`} groupChat={gc} onDelete={gc.creatorId === user?.id ? () => deleteGroupChat(gc) : undefined}/>
                ))}
              </Stack>
            </Stack>
            <Button variant="link" width="min-content" justifyContent="start" padding="0" color="brand.secondary" fontWeight="sm" fontSize="xs" onClick={handleAddGC}>Add group chat</Button>
          </Stack>
        </HStack>
        <HStack width="100%">
          {residence.creatorId === user?.id && <Button color="brand.red" onClick={() => setStep(Steps.CONFIRM_DELETE_RESIDENCE)}>Delete</Button>}
          {residence.current_residents.find((r: Resident) => r.userId === user?.id) ?
            <Button flex="1" backgroundColor="brand.red" _hover={{ backgroundColor: "brand.redLight"}} onClick={() => leaveResidence(residence)}>Leave</Button>
          :
            <Button flex="1" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}} onClick={handleJoin}>{!isAuthenticated ? "Login to " : ""}Join</Button>
          }
        </HStack>
      </Stack>
  )
}

export default ResidenceProfile
