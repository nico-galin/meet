import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box, Button, HStack, Image, Input, StackDivider, Text, VStack,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductHeader from 'components/ProductHeader';
import SearchIcon from "assets/svg/search.svg";
import Residence from 'models/Residence';
import { useMemo } from 'react';
import DataCard from 'components/DataCard';
import useAuth from 'contexts/auth/useAuth';
import { formatName } from 'hooks/utils';

interface Props {
  residence: Residence
  onClick: () => void
}

const ResidenceCard = ({ residence, onClick }: Props) => {
  const { user } = useAuth();
  const company_residents = !!residence?.current_residents ? residence.current_residents.filter(r => r.company_name == user?.company_name).length : 0;
  const total_residents = !!residence?.current_residents ? residence.current_residents.length.toString() : 0;
 return (
    <Button width="100%" onClick={onClick} flexDirection="row" height="min-content" justifyContent="start" bgColor="brand.secondaryBG" border="1px solid" borderColor="brand.secondaryStroke" borderRadius="8px" padding={["8px", "15px"]}>
      <Image src={residence.photo_uri} fit="cover" minHeight={["50px", "100px"]} width={["50px", "100px"]} borderRadius="8px"/>
      <StackDivider width={["5px", "15px"]} />
      <VStack alignItems="start" width="min-content">
        <Box alignItems="start" justifyContent="start" minW="min-content">
          <Text fontWeight="semibold" textAlign="left" fontSize={["sm", "md"]}>{residence.name}</Text>
          <Text fontSize={["xx-small", "xs"]} textAlign="start" color="brand.secondary">{residence.address}, {residence.city}, {residence.state} {residence.zip}</Text>
        </Box>
        <HStack spacing="10px" display={["none", "flex"]}>
          {!!residence.rating && <DataCard label="Rating" data={residence.rating.toString()} />}
          {!!user && !!user.company_name && <DataCard label={formatName(user.company_name)} data={company_residents.toString()}/>}
          <DataCard label={`Total Residents`} data={total_residents.toString()}/>
        </HStack>
      </VStack>
    </Button>
 )
};

export default ResidenceCard;
