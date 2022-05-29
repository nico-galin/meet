import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box, Button, HStack, Image, Input, Stack, StackDivider, Text, VStack,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductHeader from 'components/ProductHeader';
import Residence from 'models/Residence';
import { useMemo } from 'react';
import ResidenceCard from './components/ResidenceCard';
import executeSearch from 'hooks/executeSearch';
import { selectedFilter } from 'components/SearchBar/SearchBar';
import SearchIcon from "assets/svg/search.svg";
import HousingStepper from './components/HousingStepper';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';

interface Props {}

const residences = [{
  id: "0",
  name: "Residence Inn San Jose Airport",
  address: "10 Skyport Dr.",
  city: "San Jose",
  state: "CA",
  zip: "95110",
  photo_uri: "data:image/jpeg;base64,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",
  rating_list: [],
  current_residents: [],
  past_residents: [],
  group_chats: [],
} as Residence, {
  id: "1",
  name: "Revela",
  address: "200 Infinity Wy",
  city: "Mountain View",
  state: "CA",
  zip: "94043",
  photo_uri: "https://cdngeneralcf.rentcafe.com/dmslivecafe/3/1406833/ALR-MV-Revela-FULL35-1120-2-WEB(2)_p1376745.jpg?quality=85&scale=both&",
  rating_list: [],
  current_residents: [],
  past_residents: [],
  group_chats: [
    {platform: "Discord", uri: "https://discord.gg/38Xssjqc"} as GroupChat,
    {platform: "Discord", uri: "https://discord.gg/38Xssjqc"} as GroupChat
  ],
} as Residence, {
  id: "1",
  name: "Oak Creek Apartments",
  address: "1600 Sand Hill Rd",
  city: "Palo Alto",
  state: "CA",
  zip: "94304",
  photo_uri: "https://images1.apartments.com/i2/xAv-uRdQgE2nu24oJXiRiQDFXnIqsnkA4f7-TXSELSo/111/oak-creek-apartments-palo-alto-ca-primary-photo.jpg",
  rating_list: [],
  current_residents: [],
  past_residents: [],
  group_chats: [],
} as Residence];

const BrowseHousing = ({ }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [searchText, setSearchText] = useState("");
  const [selResidence, setSelResidence] = useState(-1)
  const [selectedFilters, setSelectedFilters] = useState<selectedFilter[]>([]);
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const query = new URLSearchParams(search);

  useEffect(() => {
    const v = query.get("search");
    setSearchText(!!v ? v : "");
  }, [])

  const handleSubmit = () => {
    executeSearch({ navigate, searchText, filters: selectedFilters });
  }

  const res = useMemo(() => {
    const query = new URLSearchParams(search);
    let selected = residences;
    const sQuery = query.get("search")?.toLowerCase();
    if (!!sQuery) {
      selected = selected.filter(r => {
        return JSON.stringify([r.name, r.address]).toLowerCase().includes(sQuery);
      })
    }
    return selected as Residence[];
  }, [search, residences])

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
        <ProductHeader company={user?.company_name} product='Housing' size='sm'/>
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
      <Stack padding="25px 15px" flex="1">
        {res.map((r, ind) => (
          <Box key={ind}>
            <ResidenceCard residence={r} onClick={() => setSelResidence(ind)} />
          </Box>
        ))}
      </Stack>
      <HousingStepper isOpen={selResidence >= 0} onExit={() => setSelResidence(-1)} data={selResidence >= 0 ? residences[selResidence] : null} />
    </HStack>
  )
};

export default BrowseHousing;
