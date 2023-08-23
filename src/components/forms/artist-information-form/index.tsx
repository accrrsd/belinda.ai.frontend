import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { EmailRegExp } from '../../../utils/constants'
import { FormTextInput } from '../../inputs/form-text-input'
import { SubmitButton } from '../../inputs/submit-button'
import style from './style.module.css'

type TStage<T extends FieldValues> = {
  formHook: UseFormReturn<T, any>
  onSubmit: (data: T) => void
}

export type TArtistInformation = {
  name: string
  email: string
  phone?: string
  artistName: string
  origin: string
}

export const ArtistInformationForm = ({ formHook, onSubmit }: TStage<TArtistInformation>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formHook

  return (
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

      <FormTextInput title="Enter Your Origin" placeholder="For example, Los Angeles, California" inputName="origin" {...{ register, errors }} />

      <SubmitButton children="Continue" additionalStyle={style.submitText} />
    </form>
  )
}
