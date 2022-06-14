import Community from 'models/Community';
import GroupChat from 'models/GroupChat';
import { Meetup } from 'models/Meetup';
import Residence from 'models/Residence';
import { createContext } from 'react'

export interface UpdateProps {
  id: string,
  options: {}
}

export interface DatabaseContextValues {
  residences: {[key: string]: Residence}
  meetups: {[key: string]: Meetup}
  communities: {[key: string]: Community}
  loading: boolean

  refreshResidences: () => void
  addResidence: (res: Residence) => Promise<void>
  updateResidence: (res: UpdateProps) => Promise<void>
  deleteResidence: (res: Residence) => Promise<void>
  joinResidence: (res: Residence, duration: number) => Promise<void>
  leaveResidence: (res: Residence) => Promise<void>

  refreshMeetups: () => void
  addCommunity: (com: Community) => Promise<void>
  updateCommunity: (com: UpdateProps) => Promise<void>
  deleteCommunity: (com: Community) => Promise<void>
  joinCommunity: (com: Community, duration: number) => Promise<void>
  leaveCommunity: (com: Community) => Promise<void>

  addGroupChat: (gc: GroupChat) => Promise<void>
  deleteGroupChat: (gc: GroupChat) => Promise<void>
}

const DatabaseContext = createContext<DatabaseContextValues>({
  residences: {},
  meetups: {},
  communities: {},
  loading: false,

  refreshResidences: () => {},
  addResidence: () => new Promise(() => {}),
  updateResidence: () => new Promise(() => {}),
  deleteResidence: () => new Promise(() => {}),
  joinResidence: () => new Promise(() => {}),
  leaveResidence: () => new Promise(() => {}),

  refreshMeetups: () => {},
  addCommunity: () => new Promise(() => {}),
  updateCommunity: () => new Promise(() => {}),
  deleteCommunity: () => new Promise(() => {}),
  joinCommunity: () => new Promise(() => {}),
  leaveCommunity: () => new Promise(() => {}),

  addGroupChat: () => new Promise(() => {}),
  deleteGroupChat: () => new Promise(() => {}),
});

export default DatabaseContext;
