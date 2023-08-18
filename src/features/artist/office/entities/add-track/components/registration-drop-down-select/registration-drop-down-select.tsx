import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form'
import DropDownSelectInput from 'src/components/inputs/drop-down-select'
import { TDropDownItem } from 'src/utils/types'

import { checkError } from 'src/utils/functions'
import style from './registration-drop-down-select.module.css'

type TDropDownSelectInput<T extends FieldValues> = {
  control: Control<T, any>
  inputName: Path<T>
  options: TDropDownItem[]
  rules?: object
  additionalRules?: object
  onChange?: (value: TDropDownItem) => void
  defaultValueIndex?: number
  className?: { readonly [key: string]: string }
  isOpenProp?: boolean
  placeholder: string
  absolute?: boolean
  errors: FieldErrors<T>
} & { title?: string; subtitle?: string }

export const RegistrationDropDownSelect = <T extends FieldValues>({
  title,
  subtitle,
  rules = { required: 'Required' },
  inputName,
  errors,
  ...rest
}: TDropDownSelectInput<T>) => {
  const error = checkError(inputName, errors)
  const subRest = { rules, inputName, errors }
  return (
    <div className={style.wrapper}>
      <div className={style.textWrapper}>
        {title && <span className={style.title}>{title}</span>}
        {subtitle && <span className={style.subtitle}>{subtitle}</span>}
      </div>
      <DropDownSelectInput {...subRest} {...rest} className={style} />
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  )
}
