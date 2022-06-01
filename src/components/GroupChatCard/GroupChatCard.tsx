import { Box, Button, HStack, StackDivider, Text } from "@chakra-ui/react";
import GroupChat from "models/GroupChat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DiscordIcon } from "../../assets/svg/discord.svg";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash.svg";
import { ReactComponent as GroupMeIcon } from "../../assets/svg/groupme.svg";
import { ReactComponent as IMessageIcon } from "../../assets/svg/imessage.svg";
import { ReactComponent as MessengerIcon } from "../../assets/svg/messenger.svg";
import { ReactComponent as WhatsAppIcon } from "../../assets/svg/whatsapp.svg";
import { ReactComponent as SignalIcon } from "../../assets/svg/signal.svg";
import { formatName } from "hooks/utils";

interface Props {
  groupChat: GroupChat
  size?: "sm"
  onDelete?: () => void
}

const GroupChatCard = ({ groupChat, onDelete, size}: Props) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <HStack width={!!size && size == "sm" ? "min-content" : "100%"}>
      <Button width="100%" padding="0" bgColor="brand.tertiaryBG" onClick={!!groupChat.uri ? () => window.open(groupChat.uri) : () => setFlipped(p => !p)}>
        <HStack width="100%" height="100%" alignItems="center"  flex="1" padding="10px" borderRadius="10px" border="1px solid" borderColor="brand.tertiaryStroke">
          {groupChat.platform === "discord" && <DiscordIcon width="28px"/>}
          {groupChat.platform === "groupme" && <Box marginRight="-2px"><GroupMeIcon width="30px"/></Box>}
          {groupChat.platform === "imessage" && <Box marginLeft="3px" marginRight="3px"><IMessageIcon width="22px"/></Box>}
          {groupChat.platform === "messenger" && <Box><MessengerIcon width="30px"/></Box>}
          {groupChat.platform === "whatsapp" && <Box marginLeft="3px" marginRight="2px"><WhatsAppIcon width="25px" /></Box>}
          {groupChat.platform === "signal" && <Box marginLeft="3px" marginRight="3px"><SignalIcon width="24px"/></Box>}
          {flipped ?
            <Text textAlign="start" fontSize="s" fontWeight="semibold">Contact {groupChat.contact}</Text>
          :
            <Text textAlign="start" fontSize="s" fontWeight="semibold">{!!groupChat.name ? groupChat.name : formatName(groupChat.platform)}</Text>
          }
        </HStack>
      </Button>
      <Button hidden={!onDelete ? true : false} disabled={!onDelete} padding="0" bgColor="brand.tertiaryBG" borderWidth="1px" borderColor="brand.tertiaryStroke" onClick={onDelete}>
        <TrashIcon width="30px" fill="red"/>
      </Button>
    </HStack>
  )
}

export default GroupChatCard;