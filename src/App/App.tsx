import * as React from "react"
import {
  Box, Image, Link,
} from "@chakra-ui/react"
import { Navigate, Route, Routes } from 'react-router-dom'
import Providers from "./Providers"
import NavBar from "./components/NavBar";
import Home from "../views/Home";
import SearchMeetups from "../views/SearchMeetups";
import Housing from "../views/Housing";
import Profile from "../views/Profile";
import Settings from "../views/Settings";
import NicoLogo from "assets/png/watermark_white.png"
import BrowseMeetups from "views/BrowseMeetups";
import Login from "views/Login";
import BrowseHousing from "views/BrowseHousing";
import SearchHousing from "views/SearchHousing";
import Verify from "views/Verify";

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
        <Routes>
          <Route path="home" element={<Home />} />

          <Route path="meetups" element={<SearchMeetups />} />
          <Route path="meetups/search" element={<SearchMeetups />} />
          <Route path="meetups/browse" element={<BrowseMeetups />} />

          <Route path="housing" element={<SearchHousing />} />
          <Route path="housing/search" element={<SearchHousing />} />
          <Route path="housing/browse" element={<BrowseHousing />} />

          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />

          <Route path="login" element={<Login />} />
          <Route path="verify" element={<Verify />} />

          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
        <Link position="absolute" bottom={8} right={8} isExternal href="https://nicogalin.com">
          <Image src={NicoLogo} width="140px" />
        </Link>
      </Box>
    </Box>
  </Providers>
)

export default App;