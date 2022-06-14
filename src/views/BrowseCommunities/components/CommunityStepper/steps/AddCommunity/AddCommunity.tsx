import { useEffect } from 'react'
import { Box, Button, FormControl, FormLabel, HStack, Input, Select, Stack } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form';
import { Steps } from '../../CommunityStepper';
import { formatName } from 'hooks/utils';
import ModalHeader from 'components/ModalHeader';
import { regions } from 'constants/regions';

interface Props {
  useStepper: (...args: any) => any
}

const AddCommunity = ({ useStepper }: Props) => {
  const { data, setData, setStep, onExit } = useStepper();
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
        addCommunity: {
          ...formData,
          name: formatName(formData.name),
          emoji: formData.emoji,
          region: formData.region
        },
      }));
      setStep(Steps.CONFIRM_COMMUNITY_DETAILS);
    })(e).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(!!data?.addCommunity) {
      setValue('name', data.addCommunity.name);
      setValue('emoji', data.addCommunity.emoji);
      setValue('region', data.addCommunity.region);
    }
  }, [])

  return (
    <form onSubmit={onSubmitForm}>
      <Stack spacing="30px" width="100%" textAlign="center" alignItems="start">
        <ModalHeader title="Add a community" subtitle="(This information will be reviewed)" onExit={onExit} />
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
            <HStack>
              <Controller 
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => 
                  <FormControl width="min-content">
                    <FormLabel width="min-content">Emoji</FormLabel>
                    <Input {...field} placeholder="..." maxLength={2} maxW="6em" type="text" borderWidth="1px" borderColor="brand.tertiaryStroke" bg="brand.tertiaryBG"/>
                  </FormControl>
                }
                name={'emoji'}
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
                    <FormLabel>Region</FormLabel>
                    <Select
                      minWidth="fit-content"
                      border="none"
                      bg="brand.secondaryBackgroundColor"
                      defaultValue=""
                      {...field}
                    >
                      <option value="" disabled hidden>Select...</option>
                      {regions.map((r, rInd) => (
                        <option value={r}>
                          {r}
                        </option>
                      ))}
                    </Select>
                  </FormControl>   
                }
                name={`region`}
                control={control}
                rules={{ required: true }}
              />
            </HStack>
          </Stack>
        </Box>
        <Button type="submit"  width="100%" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}}>Continue</Button>
      </Stack>
    </form>
  )
}

export default AddCommunity;
