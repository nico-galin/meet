import Modal from 'components/Modal'
import { useContext, useState, useCallback, createContext } from 'react'

interface StepperProviderProps {
  children: any
  isOpen: boolean
  onExit?: () => void
  data?: any
}

interface StepperContextValue {
  onExit: () => void
  onNextStep: () => void
  onPreviousStep: () => void
  setStep: (arg0: number) => void
  setData: (arg0: any) => void
  data: any
  isOpen: boolean
  step: number
}

interface StepperProps {
  isOpen: boolean
  onExit?: () => void
  data?: any
  steps: any
  size?: string
}

interface InnerStepperProps {
  steps: any
  size?: string
}

const createStepper = (stepNames: any) => {
  const StepperContext = createContext<StepperContextValue>({
    onExit: () => {},
    onNextStep: () => {},
    onPreviousStep: () => {},
    setStep: () => {},
    setData: () => {},
    data: null,
    isOpen: false,
    step: 0,
  })

  const StepperProvider = ({
    children,
    isOpen,
    onExit,
    data,
  }: StepperProviderProps) => {
    const [step, setStep] = useState<number>(0)
    const [dataInternal, setDataInternal] = useState(data)

    const handleExit = useCallback(() => {
      setStep(0)
      if (!!onExit) onExit()
    }, [onExit])

    const handleNextStep = useCallback(() => {
      setStep((s) => {
        if (Object.values(stepNames).includes(s + 1)) {
          return s + 1
        } else {
          handleExit();
          return 0;
        }
      })
    }, [setStep])

    const handlePreviousStep = useCallback(() => {
      if (Object.values(stepNames).includes(step - 1)) {
        setStep(step - 1)
      } else {
        handleExit()
      }
    }, [setStep, handleExit, step])

    return (
      <StepperContext.Provider
        value={{
          onExit: handleExit,
          onNextStep: handleNextStep,
          onPreviousStep: handlePreviousStep,
          setStep: setStep,
          setData: setDataInternal,
          data: dataInternal,
          isOpen,
          step,
        }}
      >
        {children}
      </StepperContext.Provider>
    )
  }

  const useStepper = () => {
    const context = useContext(StepperContext)
    return context
  }

  const InnerStepper = ({ steps, size }: InnerStepperProps) => {
    const { step, isOpen, onExit } = useStepper()

    if (!isOpen) {
      return null
    }

    return (
      <Modal size={size} onClose={onExit}>
        {Object.keys(stepNames).map((curStep, ind) => {
          return curStep === stepNames[step] ? Object.values(steps)[step] : null
        })}
      </Modal>
    )
  }

  const Stepper = ({ isOpen, onExit, steps, data, size }: StepperProps) => (
    <StepperProvider isOpen={isOpen} onExit={onExit} data={data}>
      <InnerStepper steps={steps} size={size}/>
    </StepperProvider>
  )

  return { Stepper, useStepper }
}

export default createStepper
