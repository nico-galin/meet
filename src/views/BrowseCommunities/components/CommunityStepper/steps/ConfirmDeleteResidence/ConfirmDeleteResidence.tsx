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

interface Props {
  useStepper: (...args: any) => any
}

const ConfirmDeleteResidence = ({ useStepper }: Props) => {
  const { data, onExit } = useStepper();
  const residence = data.residence;
  const { deleteResidence } = useDatabase();
  const formMethods = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    handleSubmit((data) => {
      deleteResidence(residence)
      onExit();
    })(e).catch((error) => {
      console.log(error)
    })
  }

  const validateName = (input: string) => input === residence.name;

  return (
    <form onSubmit={onSubmitForm}>
      <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
        <Box>
          <Text textAlign="left" fontWeight="semibold" fontSize="2xl">Are you sure?</Text>
          <Text textAlign="left" fontSize="sm" color="brand.secondary">(This action is irreversible)</Text>
        </Box>
        <Box width="100%" justifyContent="center">
          <Stack maxWidth={["100%", "50%"]} margin="auto">
            <Controller 
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => 
                <FormControl isInvalid={errors.name}>
                  <FormLabel fontWeight="bold">{residence.name}</FormLabel>
                  <FormLabel>Enter the residence's entire name to confirm</FormLabel>
                  <Input {...field} placeholder="Enter name..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                </FormControl>
              }
              name={'name'}
              control={control}
              rules={{ required: true, validate: validateName}}
            />
          </Stack>
        </Box>
        <Button type="submit" width="100%" backgroundColor="brand.red" _hover={{ backgroundColor: "brand.redLight"}}>Delete Residence</Button>
      </Stack>
    </form>
  )
}

export default ConfirmDeleteResidence;
