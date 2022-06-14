import { useCallback, useEffect, useMemo } from 'react'
import { Box, Button, Container, Flex, Heading, HStack, Image, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import DataCard from 'components/DataCard';
import GroupChatCard from 'components/GroupChatCard';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { formatName } from 'hooks/utils';
import useDatabase from 'contexts/database/useDatabase';
import { Member } from 'models/Residence';
import { useNavigate } from 'react-router-dom';
import { Steps } from '../../CommunityStepper';
import ModalHeader from 'components/ModalHeader';

interface Props {
  useStepper: () => any
}

const CommunityProfile = ({ useStepper }: Props) => {
  const navigate = useNavigate();
  const { onNextStep, data, setStep, onExit } = useStepper();
  const { deleteGroupChat, leaveCommunity } = useDatabase();
  const community = data?.community;
  const { user, isAuthenticated } = useAuth();
  const formattedCompanyName = formatName(user?.company_name);

  useEffect(() => {
  }, [onNextStep])
  
  const handleAddEvent = () => {
    if (isAuthenticated) {
      
    } else {
      navigate("/login");
    }
  }

  const handleAddGC = () => {
    if (isAuthenticated) {
      setStep(Steps.ADD_GROUP_CHAT)
    } else {
      navigate("/login");
    }
  }

  const handleJoin = () => {
    if (isAuthenticated) {
      setStep(Steps.CONFIRM_JOIN_COMMUNITY)
    } else {
      navigate("/login");
    }
  }

  const companyGCs = useMemo(() => community?.group_chats.filter((gc: GroupChat) => (gc.restricted && gc.company === user?.company_name)), [community])
  const companyResidents = useMemo(() => community?.members.filter((res: Member) => (res.company_name === user?.company_name)), [community])

  if (!community) return <></>;

  return (
      <Stack position="relative" spacing="20px" width="100%" height="100%" textAlign="center" alignItems="start">
        <ModalHeader onExit={onExit} title={community.name} subtitle={community.region} emoji={community.emoji}/>
        <Text>{community.description}</Text>
        <HStack width="100%" spacing="10px">
          {!!isAuthenticated && <DataCard size="sm" label={`${formatName(user?.company_name)} Employees`} data={companyResidents.length}/>}
          <DataCard size="sm" label="Total Members" data={community.members.length}/>
        </HStack>
        <Box textAlign="left">
          <Text fontSize="xl" fontWeight="semibold">Events</Text>
          <Stack>
            {companyGCs.map((gc: GroupChat, ind: number) => (
              <GroupChatCard key={`co${ind}`} groupChat={gc} onDelete={gc.creatorId === user?.id ? () => deleteGroupChat(gc) : undefined}/>
            ))}
            <Button variant="link" textDecor="underline" width="min-content" justifyContent="start" padding="0" color="brand.secondary" fontWeight="sm" fontSize="xs" onClick={handleAddEvent}>Add an event</Button>
          </Stack>
        </Box>
        <Stack spacing="15px" flex="1" width="100%">
          {isAuthenticated && companyGCs.length > 0 &&
            <Stack flex="1" textAlign="left" >
              <Box>
                <Text fontSize="xl" fontWeight="semibold">{!!formattedCompanyName ? formattedCompanyName : "Company"} Group Chats</Text>
                {!!formattedCompanyName ? 
                  <Text fontSize="sm" color="brand.secondary">Only for {formattedCompanyName} Employees</Text>
                :
                  <Text fontSize="sm" color="brand.secondary">Login to view</Text>
                }
              </Box>
              <Stack>
                {companyGCs.map((gc: GroupChat, ind: number) => (
                  <GroupChatCard key={`co${ind}`} groupChat={gc} onDelete={gc.creatorId === user?.id ? () => deleteGroupChat(gc) : undefined}/>
                ))}
              </Stack>
            </Stack>
          }
          <Stack flex="1" textAlign="left">
            <Box>
              <Text fontSize="xl" fontWeight="semibold">General Group Chats</Text>
              <Text fontSize="sm" color="brand.secondary">For Everyone</Text>
            </Box>
            <Stack>
              {community.group_chats.filter((gc: GroupChat) => !gc.restricted).map((gc: GroupChat, ind: number) => (
                <GroupChatCard key={`glo${ind}`} groupChat={gc} onDelete={gc.creatorId === user?.id ? () => deleteGroupChat(gc) : undefined}/>
              ))}
            </Stack>
          </Stack>
          <Button variant="link" textDecor="underline" width="min-content" justifyContent="start" padding="0" color="brand.secondary" fontWeight="sm" fontSize="xs" onClick={handleAddGC}>Add group chat</Button>
        </Stack>
        <HStack width="100%">
          {community.creatorId === user?.id && <Button color="brand.red" onClick={() => setStep(Steps.CONFIRM_DELETE_COMMUNITY)}>Delete</Button>}
          {community.members.find((r: Member) => r.userId === user?.id) ?
            <Button flex="1" backgroundColor="brand.red" _hover={{ backgroundColor: "brand.redLight"}} onClick={() => leaveCommunity(community)}>Leave</Button>
          :
            <Button flex="1" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}} onClick={handleJoin}>{!isAuthenticated ? "Login to " : ""}Join</Button>
          }
        </HStack>
      </Stack>
  )
}

export default CommunityProfile
