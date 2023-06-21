import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { checkError, getFinallyRules } from '../../../utils/functions'
import style from './form-text-input.module.css'

type TFormTextInput<T extends FieldValues> = {
  register: UseFormRegister<T>
  inputName: Path<T>
  rules?: object
  additionalRules?: object
  errors: FieldErrors<T>
  title: string
  subtitle?: string
} & React.HTMLProps<HTMLInputElement>

const conditions = [`'`, `"`, '`']

const defaultRules = {
  required: 'Required',
  validate: {
    checkSymbols: (v: string) => (conditions.some((el) => v.includes(el)) ? 'Your name must not contain ‘ or ”' : true),
  },
}

export const FormTextInput = <T extends FieldValues>({
  register,
  inputName,
  errors,
  rules = defaultRules,
  additionalRules,
  title,
  subtitle,
  type,
  onChange,
  onBlur,
  maxLength = 100,
  autoComplete = 'off',
  ...rest
}: TFormTextInput<T>) => {
  const error = checkError(inputName, errors)
  const finallyRules = getFinallyRules(rules, additionalRules)

  const { onChange: onChangeRegister, onBlur: onBlurRegister, name, ref } = register(inputName, finallyRules)

  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRegister(e)
    onChange?.(e)
  }

  const customOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlurRegister(e)
    onBlur?.(e)
  }

  const restProps = { name, ref, maxLength, autoComplete }

  return (
    <div className={style.wrapper}>
      <div className={style.textWrapper}>
        {title && <span className={style.title}>{title}</span>}
        {subtitle && <span className={style.subtitle}>{subtitle}</span>}
      </div>
      <input
        onChange={customOnChange}
        onBlur={customOnBlur}
        type={type ?? 'text'}
        className={`${style.input} ${error ? style.errorInput : ''}`}
        {...restProps}
        {...rest}
      />
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  )
}
