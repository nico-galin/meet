import { useRef, useState } from "react";
import { Button, HStack, Image, Input, Stack, Text, VStack } from "@chakra-ui/react";
import SearchIcon from "assets/svg/search.svg";
import SliderIcon from 'assets/svg/sliders.svg';

interface searchFilter {
  label: string
  id: string
  type: 'date' | 'timeframe' | 'custom'
  options?: string[]
}

export interface selectedFilter {
  id: string,
  values: string[]
}

interface Props {
  filters: searchFilter[]
  placeholder?: string
  onFocus?: (...args: any) => void
  onChange?: (...args: any) => void
  onSubmit?: (searchText: string, filters: any[]) => void
}

const concatString = (str: string | undefined) => {
  if (!str) return "";
  return str.slice(0, 20) + (str.length > 20 ? "..." : "");
}

const today = new Date();
const dayOptions = [...new Array(30)].map((_, ind) => new Date(today.getDate() + ind).toLocaleString('en-US').split(', ')[0]);


const SearchBar = (props: any) => {
  return <SearchBarInner {...props} filters={props?.filters.map((o: any) => o as searchFilter)}/>
}

const SearchBarInner = ({ filters, placeholder = "Search...", onFocus, onChange, onSubmit }: Props) => {
  const defaultFilters = filters.map(f => ({id: f.id, values: []} as selectedFilter));
  const [searchText, setSearchText] = useState("");
  const [togglesOpen, setTogglesOpen] = useState(false);
  const [curFilterId, setCurFilterId] = useState<string>(filters[0].id);
  const [selectedFilters, setSelectedFilters] = useState<selectedFilter[]>(defaultFilters);
  const curFilter = filters.find(f => f.id === curFilterId);
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const addFilterSelection = (curFilter: searchFilter, option: string) => {
    const newF = selectedFilters.map(f => (f.id === curFilter.id) ? {...f, values: [...f.values, option]} : f);
    setSelectedFilters(newF);
    if (!!onChange) onChange(newF);
  }

  const removeFilterSelection = (curFilter: searchFilter, option: string) => {
    const newF = selectedFilters.map(f => (f.id === curFilter.id) ? {...f, values: f.values.filter(e => e !== option)} : f)
    setSelectedFilters(newF);
    if (!!onChange) onChange(newF);
  }

  const FilterBtn = ({ display }: any) => (
    <Button display={display} onClick={() => setTogglesOpen(v => !v)} backgroundColor="brand.secondaryBG" borderRadius="8px" padding="11px">
      <Image src={SliderIcon} width="20px"/>
    </Button>
  )

  const handleSubmit = (val: string, filtersOR = []) => {
    if (!!onSubmit) onSubmit(val, !!filtersOR && filtersOR.length > 0 ? filtersOR : selectedFilters);
  }

  const selectedValues = selectedFilters.find(e => e.id === curFilter?.id)?.values;

  return (
    <HStack spacing="10px" alignItems="start">
      <VStack>
        <VStack alignItems="start">
          <HStack>
            <HStack backgroundColor="brand.secondaryBG" borderRadius="8px" minWidth={["180px", "350px", "600px"]}>
              <Image src={SearchIcon} width="15px" marginLeft="10px" marginRight="-2" onClick={() => ref.current.focus()}/>
              <Input value={searchText} onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={e=> {
                  if (e.key === 'Enter') handleSubmit(e.currentTarget.value);
                }}
                ref={ref} onFocus={onFocus} placeholder={placeholder} border="none"
                _focus={{border: "none"}} _active={{border: "none"}}
              />
            </HStack>
            <FilterBtn display={["block", "block", "none"]} />
          </HStack>
          {!togglesOpen &&
            <Stack direction={["column", "row"]} justifyContent="start" width="100%">
              <HStack width="100%">
                <Button onClick={() => handleSubmit(searchText)} flex="1" paddingX="30px" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}} fontSize="sm">Go</Button>
                <Button paddingX="30px" fontSize="sm">Create</Button>
              </HStack>
              <Button onClick={() => handleSubmit("", [])} paddingX="30px" fontSize="sm">Browse all</Button>
            </Stack>
          }
        </VStack>
        {togglesOpen &&
          <HStack justifyContent="start" alignItems="stretch" width="100%">
            <VStack minWidth="50%" >
              <VStack spacing="5px" backgroundColor="brand.secondaryBG" borderRadius="8px" padding="10px" width="100%">
                { filters.map((f, _) => (
                  <Button width="100%" onClick={() => setCurFilterId(f.id)}>
                    <HStack justifyContent="space-between" flex={1}>
                      <Text fontSize="sm">{f.label}</Text>
                      <Text fontSize="sm" fontWeight="light">{concatString(selectedFilters.find(e => e.id === f.id)?.values?.join(", "))}</Text>
                    </HStack>
                </Button>
                ))}
              </VStack>
              <HStack spacing="5px" width="100%">
                <Button onClick={() => handleSubmit(searchText)} flex="1" backgroundColor="brand.primary" _hover={{ backgroundColor: "brand.primaryLight"}} fontSize="sm">Go</Button>
                <Button onClick={() => {setTogglesOpen(false);setSelectedFilters(defaultFilters)}} flex="1" fontSize="sm">Cancel</Button>
              </HStack>
            </VStack>
            <VStack flex={1} spacing="5px" backgroundColor="brand.secondaryBG" borderRadius="8px" padding="10px" alignItems="start">
              <Text fontSize="sm" fontWeight="semibold" marginLeft="5px">Choose a {!!curFilter ? curFilter.label : "field"}...</Text>
              {!!curFilter && curFilter.options?.map(option => (
                <Button 
                  onClick={
                    selectedValues?.includes(option) ?
                      () => removeFilterSelection(curFilter, option)
                    :
                      () => addFilterSelection(curFilter, option)
                  }
                  width="100%"
                  justifyContent="start"
                  border={"2px solid"}
                  borderColor={selectedValues?.includes(option) ? "brand.primary" : "transparent"}
                >
                  <Text fontSize="sm">{option}</Text>
                </Button>
              ))}
            </VStack>
          </HStack>
        }
      </VStack>
      <FilterBtn display={["none", "none", "block"]} />
    </HStack>
  );
}

export default SearchBar;