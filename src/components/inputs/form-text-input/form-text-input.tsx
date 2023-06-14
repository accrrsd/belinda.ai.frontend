import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { checkError } from '../../../utils/functions'
import style from './form-text-input.module.css'

type TFormTextInput = {
  register: UseFormRegister<any>
  inputName: string
  rules?: object
  errors: FieldErrors<any>
  title: string
  subtitle?: string
} & React.HTMLProps<HTMLInputElement>

export const FormTextInput = ({
  register,
  inputName,
  errors,
  rules = {},
  // rules = { required: 'Поле обязательное для заполнения' },
  title,
  subtitle,
  type,
  ...rest
}: TFormTextInput) => {
  const error = checkError(inputName, errors)

  return (
    <div className={style.wrapper}>
      <div className={style.textWrapper}>
        {title && <span className={style.title}>{title}</span>}
        {subtitle && <span className={style.subtitle}>{subtitle}</span>}
      </div>
      <input
        {...register(inputName, rules)}
        type={type ?? 'text'}
        className={`${style.input} ${error ? style.errorInput : ''}`}
        autoComplete="off"
        {...rest}
      />
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  )
}
