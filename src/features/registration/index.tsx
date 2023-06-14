import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegistrationFeatureStage1 } from './stage1'
import style from './style.module.css'
import { TRegistrationFormStage1, TRegistrationFormStage2, TRegistrationFormStage3 } from './types'

export default function RegistrationFeature() {
  const formHookStage1 = useForm<TRegistrationFormStage1>({ mode: 'all' })
  const formHookStage2 = useForm<TRegistrationFormStage2>({ mode: 'all' })
  const formHookStage3 = useForm<TRegistrationFormStage3>({ mode: 'all' })

  const getContentByStage = () => {
    switch (stage as 1 | 2 | 3) {
      case 1:
        return <RegistrationFeatureStage1 formHook={formHookStage1} onSubmit={(data) => console.log(data)} />
      case 2:
        return <div className=""></div>
      case 3:
        return <div className=""></div>
    }
  }

  const [stage, setStage] = useState(1)
  return (
    <div className={style.page}>
      <div className={style.content}>{getContentByStage()}</div>
    </div>
  )
}
