import { useState } from 'react'

const useSteps = () => {
  const [activeStep, setActiveStep] = useState(0)

  const onNext = () => setActiveStep(activeStep + 1)
  const onPrev = () => setActiveStep(activeStep - 1)

  return { activeStep, onNext, onPrev }
}

export default useSteps
