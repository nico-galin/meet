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
  addResidence: (res: Residence) => Promise<number>
  updateResidence: (res: UpdateProps) => Promise<number>
  deleteResidence: (res: Residence) => Promise<number>
  joinResidence: (res: Residence, duration: number) => Promise<number>
  leaveResidence: (res: Residence) => Promise<number>

  refreshMeetups: () => void
  addCommunity: (com: Community) => Promise<number>
  updateCommunity: (com: UpdateProps) => Promise<number>
  deleteCommunity: (com: Community) => Promise<number>
  joinCommunity: (com: Community, duration: number) => Promise<number>
  leaveCommunity: (com: Community) => Promise<number>

  addGroupChat: (gc: GroupChat) => Promise<number>
  deleteGroupChat: (gc: GroupChat) => Promise<number>
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
