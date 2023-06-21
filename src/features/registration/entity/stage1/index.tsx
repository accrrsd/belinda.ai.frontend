import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { FormTextInput } from '../../../../components/inputs/form-text-input'
import { EmailRegExp } from '../../../../utils/constants'
import { isValidUrl } from '../../../../utils/functions'
import { RegistrationSubmitButton } from '../../components/registration-submit-button/registration-submit-button'
import { TRegistrationFeatureStage, TRegistrationFormStage1 } from '../../types'
import style from './style.module.css'

export const RegistrationFeatureStage1 = ({ formHook, onSubmit }: TRegistrationFeatureStage<TRegistrationFormStage1>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formHook
  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <FormTextInput title="Your Name" placeholder="David" inputName="name" {...{ register, errors }} />

        <FormTextInput
          title="Your Email Address"
          placeholder="For example, dmicofficial@gmail.com"
          inputName="email"
          {...{ register, errors }}
          additionalRules={{
            validate: {
              checkEmail: (v: string) => (EmailRegExp.test(v) ? true : 'Incorrect Email Address'),
            },
          }}
        />

        <FormTextInput
          title="Your Phone Number"
          placeholder="+1 555 123 4567"
          subtitle="Optional"
          inputName="phone"
          onChange={(e) => {
            const currentValue = e.currentTarget.value
            const clearCurrentValue = currentValue.replace(' ', '')
            const formattedPhone = new AsYouType().input(clearCurrentValue)
            if (formattedPhone) setValue('phone', formattedPhone)
          }}
          additionalRules={{
            required: false,
            validate: {
              checkPhoneNumber: (v: string) => (!v ? true : isValidPhoneNumber(v) ? true : 'Incorrect Phone Number'),
            },
          }}
          {...{ register, errors }}
        />

        <FormTextInput title="Your Artist Name" placeholder="For example, D-Mic" inputName="artistName" {...{ register, errors }} />

        <FormTextInput
          title="Add Your Artist Social Link"
          placeholder="For example, instagram.com.dmicofficial"
          inputName="artistLink"
          additionalRules={{
            validate: {
              checkUrl: (v: string) => (isValidUrl(v) ? true : 'Incorrect link'),
            },
          }}
          {...{ register, errors }}
        />

        <FormTextInput title="Enter Your Origin" placeholder="For example, Los Angeles, California" inputName="origin" {...{ register, errors }} />
        <RegistrationSubmitButton />
      </form>
    </div>
  )
}
