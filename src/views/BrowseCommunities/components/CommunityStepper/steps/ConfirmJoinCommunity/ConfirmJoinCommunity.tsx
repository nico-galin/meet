import { Box, Button, FormControl, FormLabel, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form';
import useDatabase from 'contexts/database/useDatabase';
import { Steps } from '../../CommunityStepper';
import ModalHeader from 'components/ModalHeader';

interface Props {
  useStepper: (...args: any) => any
}

const ConfirmJoinCommunity = ({ useStepper }: Props) => {
  const { data, setStep, onExit } = useStepper();
  const community = data.community;
  const { joinCommunity } = useDatabase();
  const formMethods = useForm();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    handleSubmit((data) => {
      joinCommunity(community, data.duration)
      setStep(Steps.COMMUNITY_PROFILE);
    })(e).catch((error) => {
      console.log(error)
    })
  }

  return (
    <form onSubmit={onSubmitForm}>
      <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
        <ModalHeader title="Are you sure?" subtitle="(These changes will be reflected across the app)" onExit={onExit} />
        <Box width="100%" justifyContent="center">
          <Stack margin="auto">
            <Controller 
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => 
                <FormControl isInvalid={errors.name}>
                  <FormLabel fontWeight="bold">{community.name}</FormLabel>
                  <FormLabel>How many months would you like to remain a member?</FormLabel>
                  <Input {...field} placeholder="Enter number..." type="number" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                </FormControl>
              }
              name={'duration'}
              control={control}
              rules={{ required: true, validate: (num) => num > 0}}
            />
          </Stack>
        </Box>
        <HStack width="100%">
          <Button onClick={() => setStep(Steps.COMMUNITY_PROFILE)}>Cancel</Button>
          <Button type="submit" flex="1" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Join Community</Button>
        </HStack>
      </Stack>
    </form>
  )
}

export default ConfirmJoinCommunity;
