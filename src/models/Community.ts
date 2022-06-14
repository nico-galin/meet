import GroupChat from "./GroupChat"
import { Member } from "./Residence"

export interface Community {
  id: string
  name: string
  description: string
  emoji: string
  region: string
  members: Member[]
  past_members: Member[]
  group_chats: GroupChat[]
  pending_review: boolean
  creatorId: string
  creation_timestamp: string
}

export default Community;