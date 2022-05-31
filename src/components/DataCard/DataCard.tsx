import { Box, StackDivider, Text } from "@chakra-ui/react";


interface Props {
  label: string
  data: string
  size?: "sm"
}

const DataCard = ({ label, data, size }: Props) => (
  <Box bgColor="brand.secondaryBG" padding={size === "sm" ? "6px" : "8px"} flex="1" minW="120px" alignItems="start" borderRadius="10px" border="0.5px solid" borderColor="brand.tertiaryStroke">
    <Text fontSize="xs" fontWeight="semibold" textAlign="start" color="brand.secondary">{label}</Text>
    {size!== "sm" && <StackDivider height="3px" />}
    <Text textAlign="start" fontSize="s">{data}</Text>
  </Box>
)

export default DataCard;