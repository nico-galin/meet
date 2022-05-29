import { Box, StackDivider, Text } from "@chakra-ui/react";


interface Props {
  label: string
  data: string
  size?: "sm"
}

const DataCard = ({ label, data, size }: Props) => (
  <Box bgColor="brand.tertiaryBG" padding={size === "sm" ? "6px" : "8px"} flex="1" minW="140px" alignItems="start" borderRadius="10px" border="1px solid" borderColor="brand.tertiaryStroke">
    <Text fontSize="xs" fontWeight="semibold" textAlign="start" color="brand.secondary">{label}</Text>
    {size!== "sm" && <StackDivider height="3px" />}
    <Text textAlign="start" fontSize="s">{data}</Text>
  </Box>
)

export default DataCard;