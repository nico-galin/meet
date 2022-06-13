import GroupChat from "./GroupChat"
import { Member } from "./Residence"

export interface Community {
  id: string
  name: string
  emoji: string
  region: string
  companies: string[]
  members: Member[]
  past_members: Member[]
  group_chats: GroupChat[]
  pending_review: boolean
  creatorId: string
  creation_timestamp: string
}

export default Community;