import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ReactComponent as BackArrow } from '../../images/BackArrow.svg'
import { RegistrationFeatureStage1 } from './entity/stage1'
import { RegistrationFeatureStage2 } from './entity/stage2'
import { RegistrationFeatureStage3 } from './entity/stage3'
import style from './style.module.css'
import { TRegistrationFormStage1, TRegistrationFormStage2, TRegistrationFormStage3 } from './types'

export default function RegistrationFeature() {
  const [stage, setStage] = useState(3)

  const formHookStage1 = useForm<TRegistrationFormStage1>({ mode: 'all' })
  const formHookStage2 = useForm<TRegistrationFormStage2>({ mode: 'all' })
  const formHookStage3 = useForm<TRegistrationFormStage3>({ mode: 'all' })

  const increaseStage = () => setStage((prev) => (prev + 1 > 3 ? 3 : prev + 1))

  const onRegistrationComplete = (data: TRegistrationFormStage3) => localStorage.setItem('userAuthorized', 'true')

  const getContentByStage = () => {
    switch (stage as 1 | 2 | 3) {
      case 1:
        return <RegistrationFeatureStage1 formHook={formHookStage1} onSubmit={increaseStage} />
      case 2:
        return <RegistrationFeatureStage2 formHook={formHookStage2} onSubmit={increaseStage} />
      case 3:
        return <RegistrationFeatureStage3 formHook={formHookStage3} onSubmit={onRegistrationComplete} />
    }
  }

  return (
    <div className={style.page}>
      <div className={style.content}>
        <div className={style.titleWrapper}>
          <span className={style.title}>Registration Form</span>
          <div className={style.stepWrapper}>
            <BackArrow
              className={`${style.backArrow} ${stage === 1 ? style.backArrowBorder : ''}`}
              onClick={() => stage > 1 && setStage((prev) => prev - 1)}
            />
            <div className={style.subtitle}>Step {stage}</div>
          </div>
        </div>
        {getContentByStage()}
      </div>
    </div>
  )
}
