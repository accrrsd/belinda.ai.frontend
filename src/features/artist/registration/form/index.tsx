import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FormTextInput } from '../../../../components/inputs/form-text-input'
import { SubmitButton } from '../../../../components/inputs/submit-button'
import { EmailRegExp } from '../../../../utils/constants'
import { TArtistRegistration } from '../types'
import style from './style.module.css'

type TStage<T extends FieldValues> = {
  formHook: UseFormReturn<T, any>
  onSubmit: (data: T) => void
}

export const ArtistRegistrationForm = ({ formHook, onSubmit }: TStage<TArtistRegistration>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formHook

  return (
    <div className={style.page}>
      <div className={style.content}>
        <div className={style.titleWrapper}>
          <span className={style.title}>Registration Form</span>
        </div>
        <div className={style.wrapper}>
          {' '}
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
              title="Enter Your Origin"
              placeholder="For example, Los Angeles, California"
              inputName="origin"
              {...{ register, errors }}
            />

            <SubmitButton children="Continue" additionalStyle={style.submitText} />
          </form>
        </div>
      </div>
    </div>
  )
}
