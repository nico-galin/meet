import { useCallback, useEffect, useState } from 'react'

import {
  Box, Button, Flex, HStack, Stack, Text,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface Props {}

const Home = ({ }: Props) => {
  const navigate = useNavigate();
  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <Stack spacing="40px">
        <Box>
          <Text fontWeight="bold" fontSize="3xl" textAlign="center">Welcome to Meet</Text>
          <Text color="brand.secondary" textAlign="center">Interns, find your people</Text>
        </Box>
        <HStack>
          <Button onClick={() => navigate("/communities")}>Find Communities</Button>
          <Button onClick={() => navigate("/housing")} flex="1" bgColor="brand.primary" _hover={{bgColor: "brand.primaryLight"}}>Find Housing Groups</Button>
        </HStack>
      </Stack>
    </Flex>
  )
}

export default Home;
