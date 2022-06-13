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
    handleSubmit((formData) => {
      setData((prev: any) => ({
        ...prev,
        addResidence: {
          ...formData,
          name: formatName(formData.name),
          address: formatName(formData.address),
          city: formatName(formData.city),
          state: formData.state.toUpperCase(),
          zip: formData.zip.slice(0, 6),
          group_chats: !!prev?.addResidence?.group_chats ? prev.addResidence.group_chats : [],
          photo_uri: !!prev?.addResidence?.photo_uri ? prev.addResidence.photo_uri : ""
        },
      }));
      setStep(Steps.ADD_RESIDENCE_PHOTO);
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
      setValue('uri', data.addResidence.uri);
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
          <Stack margin="auto">
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
            <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => 
                  <FormControl>
                    <FormLabel>Website</FormLabel>
                    <Input {...field} pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
                    placeholder="Enter link..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                  </FormControl>
                }
                name={'uri'}
                control={control}
                rules={{ required: true }}
              /> 
          </Stack>
        </Box>
        <Button type="submit"  width="100%" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Continue</Button>
      </Stack>
    </form>
  )
}

export default AddResidence;
