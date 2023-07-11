import { FormTextAreaInput } from '../../../../components/inputs/form-textArea-input'
import { Notice } from '../../../../components/misc/notice'
import { RegistrationSubmitButton } from '../../components/registration-submit-button/registration-submit-button'
import { TRegistrationFeatureStage, TRegistrationFormStage3 } from '../../types'
import style from './stage3.module.css'

export const RegistrationFeatureStage3 = ({ formHook, onSubmit }: TRegistrationFeatureStage<TRegistrationFormStage3>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook
  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <FormTextAreaInput rules={{ required: false }} title="Track overview" inputName="trackOverview" {...{ register, errors }} />
        <Notice>
          <span className={style.trackOverviewNotice}>Do your best, we'll help refine it</span>
        </Notice>
        <RegistrationSubmitButton text="Complete" />
      </form>
    </div>
  )
}
