import { useEffect } from 'react'
import { Box, Button, Checkbox, Container, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, InputGroup, Select, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import DataCard from 'components/DataCard';
import GroupChatCard from 'components/GroupChatCard';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { format } from 'util';
import { Controller, useForm } from 'react-hook-form';
import { Steps } from '../../CommunityStepper';
import { formatName, hashGroupChat } from 'hooks/utils';
import useDatabase from 'contexts/database/useDatabase';
import ModalHeader from 'components/ModalHeader';

interface Props {
  useStepper: (...args: any) => any
}

const AddGroupChat = ({ useStepper }: Props) => {
  const { user } = useAuth();
  const { setData, data, setStep, onExit } = useStepper();
  const { addGroupChat } = useDatabase();
  const community = data.community;
  const formMethods = useForm();
  const {
    register,
    trigger,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const flushedData = !data.addResidence;

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    handleSubmit(async (formData) => {
      let gc = {
        ...formData,
        name: !!formData.name ? formData.name : "",
        company: user?.company_name,
        restricted: !!formData.restricted,
        contact: formData.platform === "imessage" ? formData.contact : "",
        uri:  formData.platform === "imessage" ? "" : formData.uri,
        creatorId: user?.id,
      } as GroupChat;
      if (!flushedData) {
        // This link is being added before the housing obj exists
        setData((prev: any) => ({
          ...prev,
          addCommunity: {
            ...prev.addCommunity,
            group_chats: !!prev?.addCommunity?.group_chats ? [...prev.addCommunity.group_chats, gc] : [gc]
          }
        }))
        //setStep(Steps.VIEW_GROUP_CHATS)
      } else {
        gc.communityId = community.id
        addGroupChat(gc);
        setStep(Steps.COMMUNITY_PROFILE);
      }
    })(e).catch((error) => {
      console.log(error)
    })
  }

  const platform = watch('platform');

  return (
    <form onSubmit={onSubmitForm}>
      <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
        <ModalHeader title={`Add a group chat for ${flushedData ? data.community.name : data.addCommunity.name}`} subtitle="(These will expire in 6 months)" onExit={onExit} />
        <Box width="100%" justifyContent="center">
          <Stack margin="auto" spacing="20px">
            <HStack alignItems="end">
              <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => 
                  <FormControl>
                    <FormLabel>Chat Name (Optional)</FormLabel>
                    <Input {...field} placeholder="Enter name..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                  </FormControl>
                }
                name={'name'}
                control={control}
                rules={{ required: false }}
              />
              <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) =>
                  <FormControl>
                    <FormLabel>Platform</FormLabel>
                    <Select
                      minWidth="fit-content"
                      border="none"
                      bg="brand.secondaryBackgroundColor"
                      defaultValue=""
                      {...field}
                    >
                      <option value="" disabled hidden>Select...</option>
                      <option value="discord">
                        Discord
                      </option>
                      <option value="groupme">
                        GroupMe
                      </option>
                      <option value="whatsapp">
                        WhatsApp
                      </option>
                      <option value="messenger">
                        Messenger
                      </option>
                      <option value="imessage">
                        iMessage
                      </option>
                      <option value="signal">
                        Signal
                      </option>
                      <option value="wechat">
                        WeChat
                      </option>
                    </Select>
                  </FormControl>   
                }
                name={`platform`}
                control={control}
                rules={{ required: true }}
              />
            </HStack>
            {platform === "imessage" ?   
              <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => 
                  <FormControl>
                    <FormLabel>Point of contact</FormLabel>
                    <Input {...field} placeholder="Enter name..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                  </FormControl>
                }
                name={'contact'}
                control={control}
                rules={{ required: true }}
              />
            :
              <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => 
                  <FormControl>
                    <FormLabel>Invite Link</FormLabel>
                    <Input {...field} pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
                    placeholder="Enter link..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                  </FormControl>
                }
                name={'uri'}
                control={control}
                rules={{ required: true }}
              /> 
            }
            <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => 
                  <FormControl>
                    <Checkbox {...field} >Restrict to only {formatName(user?.company_name)} employees?</Checkbox>
                  </FormControl>
                }
                name={'restricted'}
                control={control}
                rules={{ required: false }}
              /> 
          </Stack>
        </Box>
        <HStack width="100%">
          <Button onClick={() => !flushedData ? setStep(Steps.ADD_COMMUNITY) : setStep(Steps.COMMUNITY_PROFILE)}>Back</Button>
          <Button type="submit" flex="1" width="100%" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Continue</Button>
        </HStack>
      </Stack>
    </form>
  )
}

export default AddGroupChat;
