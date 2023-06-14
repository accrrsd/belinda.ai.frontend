import { Control, useController } from 'react-hook-form'
import { TDropDownItem } from '../../../utils/types'
import { DropDownSelect } from './drop-down-select'

type TDropDownSelectInput = {
  control: Control<any, any>
  inputName: string
  options: TDropDownItem[]
  rules?: object
  onChange?: (value: TDropDownItem) => void
  defaultValueIndex?: number
  className?: { readonly [key: string]: string }
  isOpenProp?: boolean
}

const DropDownSelectInput = ({ control, inputName, options, rules, onChange, defaultValueIndex, className, isOpenProp }: TDropDownSelectInput) => {
  const subRules = { isOpenProp, DStyle: className, options }
  const { field } = useController({
    defaultValue: options[defaultValueIndex ?? 0],
    name: inputName,
    control,
    rules,
  })

  const onChangeWrapper = (e: TDropDownItem) => {
    field.onChange(e)
    onChange?.(e)
  }

  return <DropDownSelect value={field.value} onChange={onChangeWrapper} ref={field.ref} onBlur={field.onBlur} {...subRules} />
}
export default DropDownSelectInput
