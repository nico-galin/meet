import { Box, Button, HStack, StackDivider, Text } from "@chakra-ui/react";
import GroupChat from "models/GroupChat";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DiscordIcon } from "../../assets/svg/discord.svg";

interface Props {
  groupChat: GroupChat
}

const GroupChatCard = ({ groupChat }: Props) => {
  return (
    <Button padding="0" bgColor="brand.tertiaryBG" onClick={() => window.open(groupChat.uri)}>
      <HStack width="100%" alignItems="center"  flex="1" padding="10px" borderRadius="10px" border="1px solid" borderColor="brand.tertiaryStroke">
        {groupChat.platform === "Discord" && <DiscordIcon width="30px"/>}
        <Text textAlign="start" fontSize="s" fontWeight="semibold">{groupChat.platform}</Text>
      </HStack>
    </Button>
  )
}

export default GroupChatCard;