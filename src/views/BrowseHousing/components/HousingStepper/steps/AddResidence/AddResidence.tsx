import { useEffect } from 'react'
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, InputGroup, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import DataCard from 'components/DataCard';
import GroupChatCard from 'components/GroupChatCard';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { format } from 'util';
import { Controller, useForm } from 'react-hook-form';
import { Steps } from '../../HousingStepper';
import { formatName } from 'hooks/utils';

interface Props {
  useStepper: (...args: any) => any
}

const AddResidence = ({ useStepper }: Props) => {
  const { data, setData, setStep, step } = useStepper();
  const formMethods = useForm();
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    handleSubmit((data) => {
      setData((prev: any) => ({
        ...prev,
        addResidence: {
          name: formatName(data.name),
          address: formatName(data.address),
          city: formatName(data.city),
          state: data.state.toUpperCase(),
          zip: data.zip.slice(0, 6),
          group_chats: !!prev?.addResidence?.group_chats ? prev.addResidence.group_chats : []
        },
      }));
      setStep(Steps.VIEW_GROUP_CHATS);
    })(e).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(!!data?.addResidence) {
      setValue('name', data.addResidence.name);
      setValue('address', data.addResidence.address);
      setValue('city', data.addResidence.city);
      setValue('state', data.addResidence.state);
      setValue('zip', data.addResidence.zip);
    }
  }, [])

  return (
    <form onSubmit={onSubmitForm}>
      <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
        <Box>
          <Text textAlign="left" fontWeight="semibold" fontSize="2xl">Add a residence</Text>
          <Text textAlign="left" fontSize="sm" color="brand.secondary">(This information will be reviewed)</Text>
        </Box>
        <Box width="100%" justifyContent="center">
          <Stack maxWidth={["100%", "50%"]} margin="auto">
            <Controller 
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => 
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Enter name..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                </FormControl>
              }
              name={'name'}
              control={control}
              rules={{ required: true }}
            />
            <Controller 
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => 
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input {...field} placeholder="Enter address..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                </FormControl>
              }
              name={'address'}
              control={control}
              rules={{ required: true }}
            />
            <Controller 
              render={({
                field,
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => 
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input {...field} placeholder="Enter city..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                </FormControl>
              }
              name={'city'}
              control={control}
              rules={{ required: true }}
            />
            <HStack>
              <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => 
                  <FormControl>
                    <FormLabel>State</FormLabel>
                    <Input {...field} placeholder="e.g. CA" pattern="[A-Za-z]{2}" minLength={2} maxLength={2} type="text" autoCapitalize="all" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                  </FormControl>
                }
                name={'state'}
                control={control}
                rules={{ required: true }}
              />
              <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => 
                  <FormControl>
                    <FormLabel>Zip Code</FormLabel>
                    <Input {...field} placeholder="e.g. 95062" pattern="[0-9]{6}" type="number" minLength={6} maxLength={6} borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                  </FormControl>
                }
                name={'zip'}
                control={control}
                rules={{ required: true, maxLength: 6 }}
              />
            </HStack>
          </Stack>
        </Box>
        <Button type="submit"  width="100%" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Continue</Button>
      </Stack>
    </form>
  )
}

export default AddResidence;
