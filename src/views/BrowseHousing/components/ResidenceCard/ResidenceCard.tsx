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

interface Props {
  residence: Residence
  onClick: () => void
}

const ResidenceCard = ({ residence, onClick }: Props) => {
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
          <DataCard label="Rating" data={!!residence.rating ? residence.rating.toString() : "None"}/>
          <DataCard label={` Employees`} data={"0"}/>
          <DataCard label={`Total Residents`} data={residence.current_residents.length.toString()}/>
        </HStack>
      </VStack>
    </Button>
 )
};

export default ResidenceCard;
