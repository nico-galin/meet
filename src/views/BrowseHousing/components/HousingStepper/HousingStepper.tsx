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
  RESIDENCE_PROFILE,
  ADD_RESIDENCE,
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

const HousingStepper = ({ isOpen, startPage, onExit, data}: Props) => {
  const { useStepper, Stepper }  = useMemo(() => createStepper(Steps), [data, startPage]);

  return (
    <Stepper
      data={data}
      onExit={onExit}
      isOpen={isOpen}
      startPage={startPage}
      size={!!data?.residence ? "xl" : "sm"}
      steps={{
        RESIDENCE_PROFILE: <ResidenceProfile useStepper={useStepper} />,
        ADD_RESIDENCE: <AddResidence useStepper={useStepper} />,
        ADD_RESIDENCE_PHOTO: <AddResidencePhoto useStepper={useStepper} />,
        ADD_GROUP_CHAT: <AddGroupChat useStepper={useStepper} />,
        VIEW_GROUP_CHATS: <ViewGroupChats useStepper={useStepper} />,
        CONFIRM_ADD_HOUSING: <ConfirmResidenceDetails useStepper={useStepper} />,
        CONFIRM_DELETE_RESIDENCE: <ConfirmDeleteResidence useStepper={useStepper} />,
        JOIN_RESIDENCE: <ConfirmJoinResidence useStepper={useStepper} />,
      }}
    />
  )
}

export default HousingStepper;
