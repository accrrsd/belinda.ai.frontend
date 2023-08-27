import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { defaultInputRules } from 'src/utils/constants'
import { checkError } from 'src/utils/functions'
import style from './style.module.css'

type TInputWithIcon<T extends FieldValues> = {
  register: UseFormRegister<T>
  inputName: Path<T>
  rules?: object
  errors: FieldErrors<T>
  children?: React.ReactNode
} & React.HTMLProps<HTMLInputElement>

export const IconTextInput = <T extends FieldValues>({
  register,
  inputName,
  errors,
  rules = defaultInputRules,
  type,
  maxLength = 100,
  autoComplete = 'off',
  children,
  ...rest
}: TInputWithIcon<T>) => {
  const error = checkError(inputName, errors)

  return (
    <div className={style.wrapper}>
      <div className={`${style.content} ${error ? style.errorContent : ''}`}>
        <div className={`${style.fakeInput} ${error ? style.errorFakeInput : ''}`}>{children}</div>
        <input type={type ?? 'text'} className={`${style.input} ${error ? style.errorInput : ''}`} {...rest} {...register(inputName, rules)} />
      </div>
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  )
}
