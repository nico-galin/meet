import GroupChat from "./GroupChat"
import { PublicUser } from "./User"

export interface ResidenceRating {
  user_id: string
  user_display_name: string
  timestamp: string
  value: number
  comment: string
  likes: string[] //list of user uuid's
  flags: string[] //list of user uuid's
}

export interface Resident {
  expiration?: string
  company_name: string
  userId: string
}

export interface Residence {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  photo_uri: string
  uri: string
  rating?: number
  rating_list: ResidenceRating[]
  current_residents: Resident[]
  past_residents: Resident[]
  group_chats: GroupChat[]
  pending_review: boolean
  creatorId: string
}

export default Residence;