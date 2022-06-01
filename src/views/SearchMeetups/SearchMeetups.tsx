import { useCallback, useEffect, useState } from 'react'

import {
  Box, HStack, StackDivider, Text, VStack,
} from '@chakra-ui/react'
import ProductHeader from 'components/ProductHeader';
import SearchBar from 'components/SearchBar';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { meetup_options } from 'constants/search_options';
import executeSearch from 'hooks/executeSearch';
import useAuth from 'contexts/auth/useAuth';

interface Props {}

const SearchMeetups = ({ }: Props) => {
  const navigate = useNavigate();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { user } = useAuth();
  const filters = !!user && !!user.company_name ? meetup_options[user.company_name] : [];

  const onSubmit = (searchText: string, filters: any) => {
    executeSearch({ navigate, options: { destination: "browse", filters, searchText }})
  }
  return (
    <VStack marginTop="30vh"  alignItems="center">
      <Box minW="400px" padding="40px" width="min-content" height="max-content" bgColor="brand.secondaryBG" borderRadius="8px" borderWidth="1px" borderColor="brand.secondaryStroke">
        <Text fontSize="sm" color="brand.secondary">Welcome to Meet</Text>
        <Text fontSize="2xl" fontWeight="semibold">Find Meetups</Text>
        <StackDivider height="15px" />
        <StackDivider height="5px" />
        <HStack marginY="20px" width="100%" justifyContent="center">
          <Text>This feature is still in development, check back later!</Text>
        </HStack>
      </Box>
    </VStack>
  )
  return (
    <VStack alignItems="center" paddingTop="30vh">
      <ProductHeader company={!!user?.company_name ? user?.company_name : ""} product='Meetups'/>
      <StackDivider height="5px" />
      <SearchBar onCreate={() => {}} onSubmit={onSubmit} onFocus={() => window.scrollBy(0, 1000)} onChange={() => {}} filters={filters} placeholder="Search Meetups..."/>
      <Box height="800px" width="1px" />
    </VStack>
  )
};

export default SearchMeetups;
