import * as React from "react"
import {
  Box, Image, Link, useColorMode,
} from "@chakra-ui/react"
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Providers from "./Providers"
import NavBar from "./components/NavBar";
import Home from "../views/Home";
import SearchMeetups from "../views/SearchMeetups";
import Profile from "../views/Profile";
import Settings from "../views/Settings";
import NicoLogo from "assets/png/watermark_white.png"
import BrowseMeetups from "views/BrowseMeetups";
import Login from "views/Login";
import BrowseHousing from "views/BrowseHousing";
import SearchHousing from "views/SearchHousing";
import Verify from "views/Verify";
import useAuth from "contexts/auth/useAuth";
import Support from "views/Support";
import BrowseCommunities from "views/BrowseCommunities";

const App = () => (
  <Providers>
    <Box position="fixed" width="100%" height="100%" top="0" left="0" overflowY="hidden">
      <NavBar />
      <Box overflowY="scroll" height="100%"
        sx={{
          '&::-webkit-scrollbar': {
            width: '16px',
            borderRadius: '8px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
        }}
      >
        <Navigation />
        {/*<Link position="absolute" bottom={8} right={8} isExternal href="https://nicogalin.com">
          <Image src={NicoLogo} width={["100px", "140px"]} />
        </Link>*/}
      </Box>
    </Box>
  </Providers>
)

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const {colorMode, setColorMode } = useColorMode()
  
  React.useEffect(() => {
    if (colorMode === 'light') setColorMode('dark')
  }, [colorMode, setColorMode])
  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path="/communities" element={<BrowseCommunities />} />
      <Route path="/communities/browse" element={<BrowseCommunities />} />

      <Route path="/meetups" element={<SearchMeetups />} />
      <Route path="/meetups/search" element={<SearchMeetups />} />
      <Route path="/meetups/browse" element={<BrowseMeetups />} />

      <Route path="/housing" element={<SearchHousing />} />
      <Route path="/housing/search" element={<SearchHousing />} />
      <Route path="/housing/browse" element={<BrowseHousing />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />

      <Route path="/support" element={<Support />} />

      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App;