import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { supported_companies } from "constants/supported_companies";


interface Props {
  company: string | undefined
  product: string
  ref?: any
  size?: "sm" | "lg"
}

const ProductHeader = ({ company, product, size, ref }: Props) => {
  if (!!company && !supported_companies.map(c => c.name).includes(company)) throw Error(`${company} is not supported`);
  return (
    <HStack ref={ref} width="max-content" alignItems="center" spacing="10px" paddingRight="30px">
      {/*!!company && <Image src={require(`../../assets/svg/${company}.logo.svg`)} width={size === "sm" ? "20px" : "25px"} style={{marginTop: "-14px"}}/>*/}
      <VStack alignItems="start" spacing="-2" width="100%">
        <Text fontSize={size === "sm" ? "xl" : "3xl"} margin="0">{product}</Text>
        <Text fontSize={size === "sm" ? "xs" : "sm"} color="brand.secondary" marginTop="-10px">(unofficial)</Text>
      </VStack>
    </HStack>
  );
}

export default ProductHeader;