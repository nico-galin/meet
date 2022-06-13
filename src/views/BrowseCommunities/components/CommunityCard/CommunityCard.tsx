import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box, Button, HStack, Image, Input, StackDivider, Text, VStack,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductHeader from 'components/ProductHeader';
import SearchIcon from "assets/svg/search.svg";
import Residence from 'models/Residence';
import { useMemo } from 'react';
import DataCard from 'components/DataCard';
import useAuth from 'contexts/auth/useAuth';
import { formatName } from 'hooks/utils';
import Community from 'models/Community';

interface Props {
  community: Community
  restricted: boolean,
  onClick: () => void
}

const CommunityCard = ({ community, restricted, onClick }: Props) => {
  const { user } = useAuth();
  const company_members: number = !!community?.members ? community.members.filter(r => r.company_name === user?.company_name).length : 0;
  const total_members: number = !!community?.members ? community.members.length : 0;
  let subtitle: string = "";
  if (restricted) {
    subtitle = `${company_members} ${formatName(user?.company_name)} Members`
  } else {
    subtitle = `${total_members} Members`
  }
 return (
    <Button flex="1" onClick={onClick} minWidth={"300px"} flexDirection="row" height="min-content" justifyContent="start" bgColor="brand.secondaryBG" border="1px solid" borderColor="brand.secondaryStroke" borderRadius="8px" padding={["8px", "15px"]}>
      <Box>
        <Text fontSize="4xl">{community.emoji}</Text>
      </Box>
      <StackDivider width="15px"/>
      <Box textAlign="left">
        <Text fontWeight="extrabold">{community.name}</Text>
        <Text fontWeight="normal">{community.region}</Text>
        <Text fontWeight="normal" color="brand.secondary">{subtitle}</Text>
      </Box>
    </Button>
 )
};

export default CommunityCard;
