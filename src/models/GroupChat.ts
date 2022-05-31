export interface GroupChat {
  id: string
  residenceId: string,
  creatorId: string,
  company?: string
  name?: string
  restricted: boolean
  platform: string
  uri?: string
  contact?: string
  expiration: string
}

export default GroupChat;