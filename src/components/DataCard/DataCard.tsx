import { Box, StackDivider, Text } from "@chakra-ui/react";


interface Props {
  label: string
  data: string
}

const DataCard = ({ label, data }: Props) => (
  <Box bgColor="brand.tertiaryBG" padding="8px" minW="150px" alignItems="start" borderRadius="10px" border="1px solid" borderColor="brand.tertiaryStroke">
    <Text fontSize="xs" textAlign="start" color="brand.secondary">{label}</Text>
    <StackDivider height="3px" />
    <Text textAlign="start" >{data}</Text>
  </Box>
)

export default DataCard;