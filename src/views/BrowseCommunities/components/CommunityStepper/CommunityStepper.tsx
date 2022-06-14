import { useMemo } from 'react'
import createStepper from 'hooks/createStepper'
import CommunityProfile from './steps/CommunityProfile'
import AddCommunity from './steps/AddCommunity'
import AddGroupChat from './steps/AddGroupChat'
import ConfirmCommunityDetails from './steps/ConfirmCommunityDetails'
import ConfirmDeleteCommunity from './steps/ConfirmDeleteCommunity'
import ConfirmJoinCommunity from './steps/ConfirmJoinCommunity'

export enum Steps {
  COMMUNITY_PROFILE,
  ADD_COMMUNITY,
  ADD_GROUP_CHAT,
  //CONFIRM_ADD_HOUSING,
  CONFIRM_DELETE_COMMUNITY,
  CONFIRM_JOIN_COMMUNITY,
  CONFIRM_COMMUNITY_DETAILS,
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
        COMMUNITY_PROFILE: <CommunityProfile useStepper={useStepper} />,
        ADD_COMMUNITY: <AddCommunity useStepper={useStepper} />,
        ADD_GROUP_CHAT: <AddGroupChat useStepper={useStepper} />,
        CONFIRM_DELETE_COMMUNITY: <ConfirmDeleteCommunity useStepper={useStepper} />,
        CONFIRM_JOIN_COMMUNITY: <ConfirmJoinCommunity useStepper={useStepper} />,
        CONFIRM_COMMUNITY_DETAILS: <ConfirmCommunityDetails useStepper={useStepper} />,
      }}
    />
  )
}

export default CommunityStepper;
