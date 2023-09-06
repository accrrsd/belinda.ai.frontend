import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { FieldValues } from 'react-hook-form'
import { checkPassword } from 'src/utils/functions'
import { TSimpleForm } from 'src/utils/types'
import { EmailRegExp } from '../../../utils/constants'
import { FormTextInput } from '../../inputs/form-text-input'
import { SubmitButton } from '../../inputs/submit-button'
import style from './style.module.css'

export type TArtistInformation = {
  name: string
  email: string
  password: string
  phone?: string
  artistName: string
  origin: string
}

type TAdditionalProps = {
  passwordField?: true
}

type TStage<T extends FieldValues> = TSimpleForm<T> & TAdditionalProps

export const ArtistInformationForm = ({ formHook, onSubmit, passwordField }: TStage<TArtistInformation>) => {
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
        title="Your Email Address (and Login)"
        placeholder="For example, dmicofficial@gmail.com"
        inputName="email"
        {...{ register, errors }}
        validateRules={{
          validate: {
            checkEmail: (v: string) => (EmailRegExp.test(v) ? true : 'Incorrect Email Address'),
          },
        }}
      />

      {passwordField && (
        <FormTextInput
          title="Password"
          placeholder="*****"
          inputName="password"
          {...{ register, errors }}
          validateRules={{
            validate: {
              checkPassword,
            },
          }}
        />
      )}

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
        validateRules={{
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
