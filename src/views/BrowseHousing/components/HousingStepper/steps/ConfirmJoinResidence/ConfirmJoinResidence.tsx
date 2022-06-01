import { Box, Button, FormControl, FormLabel, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form';
import useDatabase from 'contexts/database/useDatabase';
import { Steps } from '../../HousingStepper';

interface Props {
  useStepper: (...args: any) => any
}

const ConfirmJoinResidence = ({ useStepper }: Props) => {
  const { data, setStep, onExit } = useStepper();
  const residence = data.residence;
  const { joinResidence } = useDatabase();
  const formMethods = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    handleSubmit((data) => {
      joinResidence(residence, data.duration)
      setStep(Steps.RESIDENCE_PROFILE);
    })(e).catch((error) => {
      console.log(error)
    })
  }


  return (
    <form onSubmit={onSubmitForm}>
      <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
        <Box>
          <Text textAlign="left" fontWeight="semibold" fontSize="2xl">Are you sure?</Text>
          <Text textAlign="left" fontSize="sm" color="brand.secondary">(These changes will be reflected across the app)</Text>
        </Box>
        <Box width="100%" justifyContent="center">
          <Stack margin="auto">
            <Controller 
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => 
                <FormControl isInvalid={errors.name}>
                  <FormLabel fontWeight="bold">{residence.name}</FormLabel>
                  <FormLabel>How many months will you be staying here?</FormLabel>
                  <Input {...field} placeholder="Enter months..." type="number" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                </FormControl>
              }
              name={'duration'}
              control={control}
              rules={{ required: true, validate: (num) => num > 0}}
            />
          </Stack>
        </Box>
        <HStack width="100%">
          <Button onClick={onExit}>Cancel</Button>
        <Button type="submit" flex="1" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Join Residence</Button>
        </HStack>
      </Stack>
    </form>
  )
}

export default ConfirmJoinResidence;
