import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box, Button, Flex, Heading, HStack, Image, Input, Spinner, Stack, StackDivider, Text, VStack, Wrap, WrapItem,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductHeader from 'components/ProductHeader';
import Residence from 'models/Residence';
import { useMemo } from 'react';
import ResidenceCard from './components/CommunityCard';
import executeSearch from 'hooks/executeSearch';
import { selectedFilter } from 'components/SearchBar/SearchBar';
import SearchIcon from "assets/svg/search.svg";
import CommunityStepper from './components/CommunityStepper';
import GroupChat from 'models/GroupChat';
import useAuth from 'contexts/auth/useAuth';
import { Steps } from './components/CommunityStepper/CommunityStepper';
import useDatabase from 'contexts/database/useDatabase';
import Community from 'models/Community';
import CommunityCard from './components/CommunityCard';
import { formatName } from 'hooks/utils';

interface Props {}

const BrowseCommunities = ({ }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { communities, loading } = useDatabase();
  const [searchText, setSearchText] = useState("");
  const [selCommunity, setSelCommunity] = useState("")
  const [addingCommunity, setAddingCommunity] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<selectedFilter[]>([]);
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const query = new URLSearchParams(search);

  useEffect(() => {
    const s = query.get("search");
    setSearchText(!!s ? s : "");
    const rId = query.get("id");
    if (!!rId) {
      setSelCommunity(rId)
    } else {
      setSelCommunity("")
    }
  }, [])

  useEffect(() => {
    const rId = query.get("id");
    if (!!rId) {
      setSelCommunity(rId)
    } else {
      setSelCommunity("")
    }
  }, [search])

  const handleSubmit = () => {
    executeSearch({ navigate, options: { searchText, filters: selectedFilters }});
  }

  const onClick = (id: string) => {
    executeSearch({ navigate, options: { id, searchText, filters: selectedFilters }});
  }

  const onReset = () => {
    setSearchText("")
    executeSearch({ navigate })
  }

  const handleExit = () => {
    executeSearch({ navigate, options: { searchText, filters: selectedFilters} });
    if (addingCommunity) {
      setAddingCommunity(false)
    }
    setSelCommunity("")
  }

  const handleAdd = () => {
    if (isAuthenticated) {
      setAddingCommunity(true)
    } else {
      navigate("/login")
    }
  }

  const parsed_communities = useMemo(() => {
    const query = new URLSearchParams(search);
    let selected = Object.values(communities);
    const sQuery = query.get("search")?.toLowerCase();
    if (!!sQuery) {
      selected = selected.filter(r => {
        return JSON.stringify([r.name, r.emoji, r.region]).toLowerCase().includes(sQuery);
      })
    }
    selected =  selected.sort((a, b) => a.name.localeCompare(b.name)) as Community[];
    const comp_coms = selected.filter(c => !!user?.company_name && c.group_chats.map(gc => gc.company).includes(user.company_name))
    return {
      company: comp_coms,
      all: selected
    }
  }, [search, communities])

  const searchBar = (
    <HStack marginTop="5px" width="100%">
      <HStack onClick={() => ref.current.focus()} width="100%" minW="0" backgroundColor="brand.tertiaryBG" padding="0" borderRadius="8px" minH="30px">
        <Image src={SearchIcon} width="10px"  height="100%" marginLeft="10px" marginRight="-2" />
        <Input ref={ref}
          onKeyPress={e=> {
            if (e.key === 'Enter') {
              handleSubmit();
              e.currentTarget.blur();
            }
          }}
          value={searchText} onChange={e => setSearchText(e.target.value)} fontSize="xs" minWidth="20px" height="100%" placeholder="Search..." border="none" _focus={{border: "none"}} _active={{border: "none"}}/>
        {searchText !== "" &&
          <Button fontSize="xs" fontWeight="normal" bgColor="transparent"
          _active={{border: "none"}} _hover={{bgColor: "none"}}
          onClick={onReset}
          height="100%"
          >
            Reset
          </Button>}
      </HStack>
      <Button variant="link" onClick={handleSubmit} paddingY="6px" height="100%" paddingX="0" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}} fontSize="sm">Go</Button>
    </HStack>
  )

  return (
    <HStack position="relative" height="100%" width="100%" alignItems="start" overflow="hidden">
      <VStack
        display={["none", "block"]}
        divider={<StackDivider height="1px" backgroundColor="theme.secondaryStroke" />}
        spacing="10px"
        padding="15px" backgroundColor="brand.secondaryBG"
        alignItems="start"
        width="min-content" minW="250px" height="100%"
        borderRight="1px solid" borderColor="brand.secondaryStroke"
      >
        <ProductHeader company={user?.company_name} product='Communities' size='sm'/>
        { searchBar }
      </VStack>
      <Wrap padding="25px 15px" paddingBottom="300px" flex="1" spacing="15px" height="100%" overflowY="scroll" sx={{
          '&::-webkit-scrollbar': {
            width: '16px',
            borderRadius: '8px',
            backgroundColor: `none`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `none`,
          },
        }}
      >
        <Box width="100%" display={["block", "none"]}>
          { searchBar }
          <StackDivider height="20px" />
        </Box>
        { isAuthenticated && !!user?.company_name && parsed_communities.company.length > 0 &&
          <>
            <Heading fontSize="lg" width="100%">{formatName(user.company_name)} Communities</Heading>
            {parsed_communities.company.map((c, ind) => (
              <WrapItem key={ind}>
                <CommunityCard community={c} onClick={() => onClick(c.id)} restricted={true}/>
              </WrapItem>
            ))}
            <StackDivider width="100%" height="10px" />
          </>
        }
        <Heading fontSize="lg" width="100%">All Communities</Heading>
        {parsed_communities.all.map((c, ind) => (
          <WrapItem key={ind}>
            <CommunityCard community={c} onClick={() => onClick(c.id)} restricted={false}/>
          </WrapItem>
        ))}
        {loading ?
          <Flex width="100%" alignItems="center" padding="30px">
            <Spinner margin="auto" size="md" />
          </Flex>
        :
          <>
            <StackDivider width="100%" height="5px" />
            <Text fontSize={["xs", "md"]}>Can't find what you're looking for? <Button variant="link" fontSize={["xs", "md"]} onClick={handleAdd}>Add a new Community</Button></Text>
          </>
        }
      </Wrap>
      <CommunityStepper
        isOpen={(!!selCommunity && !!communities && !!communities[selCommunity]) || addingCommunity === true}
        startPage={addingCommunity ? Steps.ADD_COMMUNITY : Steps.COMMUNITY_PROFILE}
        onExit={handleExit}
        data={!!selCommunity ? {community: communities[selCommunity]} : null}
      />
    </HStack>
  )
};

export default BrowseCommunities;
