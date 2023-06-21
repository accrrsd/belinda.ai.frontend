import { Control, FieldErrors, FieldValues, Path, useController } from 'react-hook-form'
import { checkError, getFinallyRules } from '../../../utils/functions'
import { TDropDownItem } from '../../../utils/types'
import { DropDownSelect } from './drop-down-select'

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
  absolute?: boolean
  placeholder?: string
  errors: FieldErrors<T>
}

const DropDownSelectInput = <T extends FieldValues>({
  control,
  inputName,
  options,
  rules,
  additionalRules,
  onChange,
  defaultValueIndex,
  className,
  isOpenProp,
  absolute,
  placeholder,
  errors,
}: TDropDownSelectInput<T>) => {
  const subRules = { isOpenProp, DStyle: className, options, absolute, placeholder }
  const error = checkError(inputName, errors)
  const finallyRules = rules ? getFinallyRules(rules, additionalRules) : undefined

  const setDefaultValue = () => {
    if (!defaultValueIndex) return options[0]
    if (defaultValueIndex === -1) return undefined
    if (defaultValueIndex >= 0) return options[defaultValueIndex]
  }
  const { field } = useController({
    //@ts-ignore:next-line
    defaultValue: setDefaultValue(),
    name: inputName,
    control,
    rules: finallyRules,
  })

  const onChangeWrapper = (e: TDropDownItem) => {
    field.onChange(e)
    onChange?.(e)
  }

  return <DropDownSelect value={field.value} onChange={onChangeWrapper} error={!!error} ref={field.ref} onBlur={field.onBlur} {...subRules} />
}
export default DropDownSelectInput
