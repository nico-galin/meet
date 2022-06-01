import {
  Stack,
  Button,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  Box,
} from '@chakra-ui/react'
import { useLocation, Link as rLink } from 'react-router-dom'
import { ReactComponent as BrandLogo } from 'assets/svg/brand.logo.svg';
import { ReactComponent as Chevron } from 'assets/svg/chevron.up.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useAuth from 'contexts/auth/useAuth';
import { ReactComponent as Logo } from "assets/svg/logo.svg"
import { formatName } from 'hooks/utils';

interface Props {};

const NavBar = (props: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, signIn, signOut, user } = useAuth();
  const [open, setOpen] = useState(false);

  const onAccount = () => {
    if (!isAuthenticated) navigate("/login");
  }

  return (
    <Box>
      <HStack backgroundColor="brand.secondaryBG" width="100%" justifyContent="space-between" padding="10px" borderBottom="1px solid" borderColor="brand.secondaryStroke">
        <HStack>
          <Link isExternal href="https://nicogalin.com" padding="0">
            <Logo height="20px" width="30px"/>
          </Link>
          <Link as={rLink} _hover={{textDecoration: "none"}} to="/home"><Text fontSize="xl">Meet</Text></Link>
        </HStack>
        <HStack spacing="30px">
          <Link as={rLink} _hover={{textDecoration: "none"}} to="/housing"><Text fontSize="sm">Housing</Text></Link>
          <Link as={rLink} _hover={{textDecoration: "none"}} to="/meetups"><Text fontSize="sm">Meetups</Text></Link>
          <Link as={rLink} _hover={{textDecoration: "none"}} to="/people"><Text fontSize="sm">People</Text></Link>
          <Link as={rLink} _hover={{textDecoration: "none"}} to="/support"><Text fontSize="sm">Support</Text></Link>
          <HStack position="relative" spacing="2px">
            <Button  onClick={onAccount} backgroundColor="brand.primary" height="35px" paddingX="30px" fontSize="sm" _hover={{bg: "brand.primaryLight"}} borderRightRadius={0} borderBottomLeftRadius={open ? 0 : 8}>Account</Button>
            <Button backgroundColor="brand.primary" height="35px" paddingX="0px" _hover={{bg: "brand.primaryLight"}} borderLeftRadius={0} borderBottomRightRadius={open ? 0 : 8} onClick={() => setOpen(prev => !prev)}>
              <Chevron fill="white" width="15px" style={{ transform: `rotate(${open ? '180deg' : '0'})`}}/>
            </Button>
            {open &&
              <Stack onMouseLeave={() => setOpen(false)} zIndex={999} backgroundColor={"brand.primary"} minW="100%" borderBottomRadius="8px" position="absolute" top="calc(2px + 100%)" right="0" spacing={0}>
                {!!user?.company_name && <Button fontSize="sm" width="100%" justifyContent="end" paddingLeft="20px" bg="none" borderRadius={0}>{formatName(user?.company_name)}</Button>}
                <Button fontSize="sm" width="100%" justifyContent="end" paddingLeft="20px" bg="none" borderRadius={0}>Settings</Button>
                <Button onClick={isAuthenticated ? signOut : () => navigate("/login")} fontSize="sm" width="100%" justifyContent="end" paddingLeft="20px" bg="none" borderRadius={0}>{isAuthenticated? "Sign Out" : "Sign In"}</Button>
              </Stack>
            }
          </HStack>
        </HStack>
      </HStack>
    </Box>
  )
};

export default NavBar;
