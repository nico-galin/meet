import { Box, Stack, StackDivider, Text } from "@chakra-ui/react";


interface Props {
  label: string
  data: string
  size?: "sm"
}

const DataCard = ({ label, data, size }: Props) => (
  <Stack spacing={size === "sm" ? "-0.5" : "3px"} bgColor="brand.tertiaryBG" padding={size === "sm" ? "6px" : "8px"} flex="1" minW="120px" alignItems="start" borderRadius="10px" border="0.5px solid" borderColor="brand.tertiaryStroke">
    <Text fontSize="xs" fontWeight="semibold" textAlign="start" color="brand.secondary">{label}</Text>
    <Text textAlign="start" fontSize="s" fontWeight="bold">{data}</Text>
  </Stack>
)

export default DataCard;