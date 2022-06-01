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

const AddResidencePhoto = ({ useStepper }: Props) => {
  const { data, setData, setStep, step } = useStepper();
  const formMethods = useForm();
  const {
    watch,
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
          ...prev.addResidence,
          photo_uri: formData.photo_uri
        },
      }));
      setStep(Steps.VIEW_GROUP_CHATS);
    })(e).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(!!data?.addResidence) {
      setValue('photo_uri', data.addResidence.photo_uri);
    }
  }, [])

  const url = watch("photo_uri");
  return (
    <form onSubmit={onSubmitForm}>
      <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
        <Box>
          <Text textAlign="left" fontWeight="semibold" fontSize="2xl">Add a photo URL</Text>
          <Text textAlign="left" fontSize="sm" color="brand.secondary">Grab the url from Google or something</Text>
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
                    <FormLabel>URL</FormLabel>
                    <Input {...field}
                    placeholder="Enter url..." type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                  </FormControl>
                }
                name={'photo_uri'}
                control={control}
                rules={{ required: true }}
              /> 
              <Box>
                <FormLabel>Preview</FormLabel>
                {!!url && <Image src={url} height="100px" borderRadius="10px"/>}
              </Box>
          </Stack>
        </Box>
        <HStack width="100%">
        <Button onClick={() => setStep(Steps.ADD_RESIDENCE)}>Back</Button>
        <Button type="submit"  width="100%" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Continue</Button>
      </HStack>
      </Stack>
    </form>
  )
}

export default AddResidencePhoto;
