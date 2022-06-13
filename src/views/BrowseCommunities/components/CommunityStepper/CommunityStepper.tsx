import { useEffect, useMemo } from 'react'
import createStepper from 'hooks/createStepper'
import ResidenceProfile from './steps/ResidenceProfile'
import AddResidence from './steps/AddResidence'
import AddGroupChat from './steps/AddGroupChat'
import ViewGroupChats from './steps/ViewGroupChats'
import ConfirmResidenceDetails from './steps/ConfirmResidenceDetails'
import ConfirmDeleteResidence from './steps/ConfirmDeleteResidence'
import ConfirmJoinResidence from './steps/ConfirmJoinResidence'
import AddResidencePhoto from './steps/AddResidencePhoto'

export enum Steps {
  COMMUNITY_PROFILE,
  ADD_COMMUNITY,
  ADD_RESIDENCE_PHOTO,
  ADD_GROUP_CHAT,
  VIEW_GROUP_CHATS,
  CONFIRM_ADD_HOUSING,
  CONFIRM_DELETE_RESIDENCE,
  JOIN_RESIDENCE,
}

export interface Props {
  isOpen: boolean
  startPage: any
  onExit?: () => void
  data: any
}

const CommunityStepper = ({ isOpen, startPage, onExit, data}: Props) => {
  const { useStepper, Stepper }  = useMemo(() => createStepper(Steps), [data, startPage]);

  return (
    <Stepper
      data={data}
      onExit={onExit}
      isOpen={isOpen}
      startPage={startPage}
      size={!!data?.community ? "sm" : "sm"}
      steps={{
        COMMUNITY_PROFILE: <ResidenceProfile useStepper={useStepper} />,
        ADD_COMMUNITY: <AddResidence useStepper={useStepper} />,
      }}
    />
  )
}

export default CommunityStepper;
