import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box, Button, Flex, HStack, Image, Input, Spinner, Stack, StackDivider, Text, VStack,
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
import { Steps } from './components/HousingStepper/HousingStepper';
import useDatabase from 'contexts/database/useDatabase';

interface Props {}

const BrowseHousing = ({ }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { residences, loading } = useDatabase();
  const [searchText, setSearchText] = useState("");
  const [selResidence, setSelResidence] = useState("")
  const [addingResidence, setAddingResidence] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<selectedFilter[]>([]);
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const query = new URLSearchParams(search);

  useEffect(() => {
    const s = query.get("search");
    setSearchText(!!s ? s : "");
    const rId = query.get("id");
    if (!!rId) {
      setSelResidence(rId)
    } else {
      setSelResidence("")
    }
  }, [])

  useEffect(() => {
    const rId = query.get("id");
    if (!!rId) {
      setSelResidence(rId)
    } else {
      setSelResidence("")
    }
  }, [search])

  const handleSubmit = () => {
    executeSearch({ navigate, options: { searchText, filters: selectedFilters }});
  }

  const onClick = (id: string) => {
    executeSearch({ navigate, options: { id }});
  }

  const handleExit = () => {
    executeSearch({ navigate });
    if (addingResidence) {
      setAddingResidence(false)
    }
    setSelResidence("")
  }

  const handleAdd = () => {
    if (isAuthenticated) {
      setAddingResidence(true)
    } else {
      navigate("/login")
    }
  }

  const res = useMemo(() => {
    const query = new URLSearchParams(search);
    let selected = Object.values(residences);
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
            <Button variant="link" onClick={handleSubmit} height="100%" paddingX="0" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}} fontSize="sm">Go</Button>
          </HStack>
        </VStack>
      </VStack>
      <Stack padding="25px 15px" flex="1">
        {res.map((r, ind) => (
          <Box key={ind}>
            <ResidenceCard residence={r} onClick={() => onClick(r.id)} />
          </Box>
        ))}
        {loading ?
          <Flex width="100%" alignItems="center" padding="30px">
            <Spinner margin="auto" size="md" />
          </Flex>
        :
          <Text>Can't find what you're looking for? <Button variant="link" onClick={handleAdd}>Add a new Residence</Button></Text>
        }
      </Stack>
      <HousingStepper
        isOpen={(!!selResidence && !!residences && !!residences[selResidence]) || addingResidence === true}
        startPage={addingResidence ? Steps.ADD_RESIDENCE : Steps.RESIDENCE_PROFILE}
        onExit={handleExit}
        data={!!selResidence ? {residence: residences[selResidence]} : null}
      />
    </HStack>
  )
};

export default BrowseHousing;
