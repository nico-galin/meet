import { useEffect } from 'react'
import createStepper from 'hooks/createStepper'
import ResidenceProfile from './steps/ResidenceProfile'

export enum Steps {
  RESIDENCE_PROFILE,
  INFO,
}

export interface Props {
  isOpen: boolean
  onExit?: () => void
  data: any
}

const HousingStepper = ({ isOpen, onExit, data}: Props) => {
  const { useStepper, Stepper } = createStepper(Steps)
  const { setStep, setData } = useStepper();

  useEffect(() => {
    setStep(Steps.RESIDENCE_PROFILE)
  }, [setStep])

  return (
    <Stepper
      data={data}
      onExit={onExit}
      isOpen={isOpen}
      steps={{
        RESIDENCE_PROFILE: <ResidenceProfile useStepper={useStepper} />,
      }}
    />
  )
}

export default HousingStepper;
