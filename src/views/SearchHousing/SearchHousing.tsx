import { useCallback, useEffect, useState } from 'react'

import {
  Box, StackDivider, VStack,
} from '@chakra-ui/react'
import ProductHeader from 'components/ProductHeader';
import SearchBar from 'components/SearchBar';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { housing_options } from 'constants/search_options';
import executeSearch from 'hooks/executeSearch';
import useAuth from 'contexts/auth/useAuth';

interface Props {}

const SearchHousing = ({ }: Props) => {
  const navigate = useNavigate();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { user } = useAuth();
  const onSubmit = (searchText: string, filters: any) => {
    executeSearch({ navigate, options: { destination: "browse", filters, searchText }})
  }
  const filters = housing_options;

  return (
    <VStack alignItems="center" paddingTop="30vh">
      <ProductHeader company={user?.company_name} product="Housing"/>
      <StackDivider height="5px" />
      <SearchBar onSubmit={onSubmit} onFocus={() => window.scrollBy(0, 1000)} onChange={() => {}} filters={filters} placeholder="Search Housing..."/>
      <Box height="800px" width="1px" />
    </VStack>
  )
};

export default SearchHousing;
