import GroupChat from 'models/GroupChat';
import { Meetup } from 'models/Meetup';
import Residence from 'models/Residence';
import { createContext } from 'react'

export interface ResidenceUpdateProps {
  id: string,
  options: {}
}

export interface DatabaseContextValues {
  residences: {[key: string]: any},
  meetups: Meetup[]
  loading: boolean
  refreshResidences: () => void
  refreshMeetups: () => void
  addResidence: (res: Residence) => Promise<void>
  updateResidence: (res: ResidenceUpdateProps) => Promise<void>
  deleteResidence: (res: Residence) => Promise<void>
  joinResidence: (res: Residence, duration: number) => Promise<void>
  leaveResidence: (res: Residence) => Promise<void>
  addGroupChat: (gc: GroupChat) => Promise<void>
  deleteGroupChat: (gc: GroupChat) => Promise<void>
}

const DatabaseContext = createContext<DatabaseContextValues>({
  residences: {},
  meetups: [],
  loading: false,
  refreshResidences: () => {},
  refreshMeetups: () => {},
  addResidence: () => new Promise(() => {}),
  updateResidence: () => new Promise(() => {}),
  deleteResidence: () => new Promise(() => {}),
  joinResidence: () => new Promise(() => {}),
  leaveResidence: () => new Promise(() => {}),
  addGroupChat: () => new Promise(() => {}),
  deleteGroupChat: () => new Promise(() => {}),
});

export default DatabaseContext;
