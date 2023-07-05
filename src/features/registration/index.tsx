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

  const getDefaultValuesFromLocal = (itemName: string) => {
    const data = localStorage.getItem(itemName)
    return data ? JSON.parse(data) : null
  }

  const formHookStage1 = useForm<TRegistrationFormStage1>({ mode: 'all', defaultValues: getDefaultValuesFromLocal('regStage1Data') })
  const formHookStage2 = useForm<TRegistrationFormStage2>({ mode: 'all', defaultValues: getDefaultValuesFromLocal('regStage2Data') })
  const formHookStage3 = useForm<TRegistrationFormStage3>({ mode: 'all', defaultValues: getDefaultValuesFromLocal('regStage3Data') })

  const increaseStage = () => setStage((prev) => (prev + 1 > 3 ? 3 : prev + 1))

  const onSubmitStage = (data: TRegistrationFormStage1 | TRegistrationFormStage2 | TRegistrationFormStage3, localStorageItemName: string) => {
    localStorage.setItem(localStorageItemName, JSON.stringify(data))
    increaseStage()
  }

  const getContentByStage = () => {
    switch (stage as 1 | 2 | 3) {
      case 1:
        return <RegistrationFeatureStage1 formHook={formHookStage1} onSubmit={(d) => onSubmitStage(d, 'regStage1Data')} />
      case 2:
        return <RegistrationFeatureStage2 formHook={formHookStage2} onSubmit={(d) => onSubmitStage(d, 'regStage2Data')} />
      case 3:
        return <RegistrationFeatureStage3 formHook={formHookStage3} onSubmit={(d) => onSubmitStage(d, 'regStage3Data')} />
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
