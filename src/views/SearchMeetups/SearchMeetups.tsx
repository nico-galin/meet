import { useCallback, useEffect, useState } from 'react'

import {
  Box, StackDivider, VStack,
} from '@chakra-ui/react'
import ProductHeader from 'components/ProductHeader';
import SearchBar from 'components/SearchBar';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { meetup_options } from 'constants/search_options';
import executeSearch from 'hooks/executeSearch';

interface Props {}

const SearchMeetups = ({ }: Props) => {
  const navigate = useNavigate();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const onSubmit = (searchText: string, filters: any) => {
    executeSearch({ navigate, destination: "browse", filters, searchText })
  }
  return (
    <VStack alignItems="center" paddingTop="30vh">
      <ProductHeader company='apple' product='Meetups'/>
      <StackDivider height="5px" />
      <SearchBar onSubmit={onSubmit} onFocus={() => window.scrollBy(0, 1000)} onChange={() => {}} filters={meetup_options["apple"]} placeholder="Search Meetups..."/>
      <Box height="800px" width="1px" />
    </VStack>
  )
};

export default SearchMeetups;
