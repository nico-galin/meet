import { useEffect } from 'react'
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, InputGroup, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import DataCard from 'components/DataCard';
import GroupChatCard from 'components/GroupChatCard';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { format } from 'util';
import { Controller, useForm } from 'react-hook-form';
import { Steps } from '../../CommunityStepper';
import { formatName } from 'hooks/utils';
import useDatabase from 'contexts/database/useDatabase';
import ModalHeader from 'components/ModalHeader';

interface Props {
  useStepper: (...args: any) => any
}

const ConfirmDeleteCommunity = ({ useStepper }: Props) => {
  const { data, onExit, setStep } = useStepper();
  const community = data.community;
  const { deleteCommunity } = useDatabase();
  const formMethods = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    handleSubmit((data) => {
      deleteCommunity(community)
      onExit();
    })(e).catch((error) => {
      console.log(error)
    })
  }

  const validateName = (input: string) => input === community.name;

  return (
    <form onSubmit={onSubmitForm}>
      <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
        <ModalHeader title="Are you sure?" subtitle="(This action is irreversible)" onExit={onExit} />
        <Box width="100%" justifyContent="center">
          <Stack maxWidth="100%" margin="auto">
            <Controller 
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => 
                <FormControl isInvalid={errors.name}>
                  <FormLabel fontWeight="bold">{community.name}</FormLabel>
                  <FormLabel>Enter the community's entire name to confirm</FormLabel>
                  <Input {...field} placeholder="Enter name..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                </FormControl>
              }
              name={'name'}
              control={control}
              rules={{ required: true, validate: validateName}}
            />
          </Stack>
        </Box>
        <HStack width="100%">
          <Button onClick={() => setStep(Steps.COMMUNITY_PROFILE)}>Cancel</Button>
          <Button type="submit" width="100%" backgroundColor="brand.red" _hover={{ backgroundColor: "brand.redLight"}}>Delete Community</Button>
        </HStack>
      </Stack>
    </form>
  )
}

export default ConfirmDeleteCommunity;
