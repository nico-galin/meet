import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box, Button, HStack, Image, Input, StackDivider, Text, VStack,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductHeader from 'components/ProductHeader';
import SearchIcon from "assets/svg/search.svg";
import Residence from 'models/Residence';
import { useMemo } from 'react';
import executeSearch from 'hooks/executeSearch';
import { selectedFilter } from 'components/SearchBar/SearchBar';
import { Meetup } from 'models/Meetup';

interface Props {}

const BrowseMeetups = ({ }: Props) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [searchText, setSearchText] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<selectedFilter[]>([]);
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const meetups = [
    {} as Meetup
  ]

  const handleSubmit = () => {
    executeSearch({ navigate, searchText, filters: selectedFilters });
  }

  const res = useMemo(() => {
    const query = new URLSearchParams(search);
    let selected = meetups;
    const sQuery = query.get("search")?.toLowerCase();
    if (!!sQuery) {
      selected = selected.filter(m => {
        return JSON.stringify([]).toLowerCase().includes(sQuery);
      })
    }
    return selected as Meetup[];
  }, [search, meetups])

  return (
    <HStack height="100%" alignItems="start">
      <VStack
        divider={<StackDivider height="1px" backgroundColor="theme.secondaryStroke" />}
        spacing="10px"
        padding="15px" backgroundColor="brand.secondaryBG"
        alignItems="start"
        width="min-content" minW="250px" height="100%"
        borderRight="1px solid" borderColor="brand.secondaryStroke"
      >
        <ProductHeader company='apple' product='Meetups' size='sm'/>
        <VStack width="100%">
          <HStack marginTop="5px" width="100%">
            <HStack onClick={() => ref.current.focus()} width="100%" backgroundColor="brand.tertiaryBG" padding="0" borderRadius="8px" minH="30px">
              <Image src={SearchIcon} width="10px"  height="100%" marginLeft="10px" marginRight="-2" />
              <Input ref={ref}
                onKeyPress={e=> {
                  if (e.key === 'Enter') {
                    handleSubmit();
                    e.currentTarget.blur();
                  }
                }}
                value={searchText} onChange={e => setSearchText(e.target.value)} fontSize="xs" minW="20px" height="100%" placeholder="Search..." border="none" _focus={{border: "none"}} _active={{border: "none"}}/>
              {searchText !== "" &&
                <Button fontSize="xs" fontWeight="normal" bgColor="transparent"
                _active={{border: "none"}} _hover={{bgColor: "none"}}
                onClick={() => setSearchText("")}
                height="100%"
                >
                  Clear
                </Button>}
            </HStack>
            <Button onClick={handleSubmit} height="100%" paddingX="0" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}} fontSize="sm">Go</Button>
          </HStack>
        </VStack>
      </VStack>
      <Box padding="25px 15px" flex="1">
        {res.map((r, ind) => (
          <Text>{r.toString()}</Text>
        ))}
      </Box>
    </HStack>
  )
};

export default BrowseMeetups;
