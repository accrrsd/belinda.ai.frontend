import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { checkError, getFinallyRules } from '../../../utils/functions'
import style from './form-textArea-input.module.css'

type TFormTextAreaInput<T extends FieldValues> = {
  register: UseFormRegister<T>
  inputName: Path<T>
  rules?: object
  additionalRules?: object
  errors: FieldErrors<T>
  title: string
  subtitle?: string
} & React.HTMLProps<HTMLTextAreaElement>

const defaultRules = {
  required: 'Required',
}

export const FormTextAreaInput = <T extends FieldValues>({
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
  maxLength,
  autoComplete = 'off',
  ...rest
}: TFormTextAreaInput<T>) => {
  const error = checkError(inputName, errors)
  const finallyRules = getFinallyRules(rules, additionalRules)

  const { onChange: onChangeRegister, onBlur: onBlurRegister, name, ref } = register(inputName, finallyRules)

  const customOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeRegister(e)
    onChange?.(e)
  }

  const customOnBlur = (e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    onBlurRegister(e)
    onBlur?.(e)
  }

  const autoResizeOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = e.currentTarget.style.minHeight
    const height = e.currentTarget.scrollHeight - parseInt(e.currentTarget.style.lineHeight) / 2
    e.currentTarget.style.height = `${height}px`
  }

  const restProps = { name, ref, maxLength, autoComplete }

  return (
    <div className={style.wrapper}>
      <div className={style.textWrapper}>
        {title && <span className={style.title}>{title}</span>}
        {subtitle && <span className={style.subtitle}>{subtitle}</span>}
      </div>
      <textarea
        onChange={customOnChange}
        onBlur={customOnBlur}
        onKeyDown={autoResizeOnKeyDown}
        className={`${style.textArea} ${error ? style.errorTextArea : ''}`}
        {...restProps}
        {...rest}
      />
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  )
}
