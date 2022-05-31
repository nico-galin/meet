export interface PublicUser {
  id: string
  name_first: string
  name_last: string
  name_display: string
  company_name: string
  compaany_role: string
  profile_photo_uri: string
  linkedin_uri: string
  discord_uri: string
  facebook_uri: string
  website_uri: string
}

export interface User extends PublicUser {
  email: string
  register_timestamp: string
  birthdate: string
  theme: string
  residences: string[]
}

export default User;
