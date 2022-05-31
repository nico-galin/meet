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
    <Button onClick={onClick} flexDirection="row" width="100%" height="min-content" justifyContent="start" bgColor="brand.secondaryBG" border="1px solid" borderColor="brand.secondaryStroke" borderRadius="8px" padding="15px">
      <Image src={residence.photo_uri} fit="cover" minHeight="100px" width="100px" borderRadius="8px"/>
      <StackDivider width="15px" />
      <VStack alignItems="start" >
        <Box alignItems="start" justifyContent="start">
          <Text fontWeight="semibold" textAlign="left" height="min-content">{residence.name}</Text>
          <Text fontSize="xs" textAlign="start" color="brand.secondary">{residence.address}, {residence.city}, {residence.state} {residence.zip}</Text>
        </Box>
        <HStack>
          {!!residence.rating && <DataCard label="Rating" data={residence.rating.toString()} />}
          {!!user && !!user.company_name && <DataCard label={formatName(user.company_name)} data={company_residents.toString()}/>}
          <DataCard label={`Total Residents`} data={total_residents.toString()}/>
        </HStack>
      </VStack>
    </Button>
 )
};

export default ResidenceCard;
