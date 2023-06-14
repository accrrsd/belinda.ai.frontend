import { UseFormReturn } from 'react-hook-form'
import { FormTextInput } from '../../../components/inputs/form-text-input/form-text-input'
import { TRegistrationFormStage1 } from '../types'
import style from './style.module.css'

type TRegistrationFeatureStage1 = {
  formHook: UseFormReturn<TRegistrationFormStage1, any>
  onSubmit: (data: TRegistrationFormStage1) => void
}

export const RegistrationFeatureStage1 = ({ formHook, onSubmit }: TRegistrationFeatureStage1) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook
  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}></form>
      <FormTextInput title="Your Name" inputName="name" {...{ register, errors }} />
    </div>
  )
}
