import { forwardRef, useState } from 'react'
import { v4 } from 'uuid'
import { TDropDownItem } from '../../../utils/types'
import style from './drop-down-select.module.css'

type TDropDownSelect = {
  absolute?: boolean
  options: TDropDownItem[]
  onBlur?: (e: React.FocusEvent<any, Element> | void) => void
  isOpenProp?: boolean
  DStyle?: { readonly [key: string]: string }
  value?: TDropDownItem
  onChange: (value: TDropDownItem) => void
}

export const DropDownSelect = forwardRef<HTMLDivElement, TDropDownSelect>(
  ({ absolute, options, onBlur, isOpenProp, DStyle = style, value, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(isOpenProp ?? false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const onBlurHandler = () => {
      setIsOpen(false)
      onBlur?.()
    }
    const selectOption = (option: TDropDownItem) => (option !== value ? onChange(option) : undefined)
    const isOptionSelected = (option: TDropDownItem) => option.label === value?.label && option.value === value?.value

    return (
      <div className={DStyle.container} ref={ref} onBlur={onBlurHandler} onClick={() => setIsOpen((prev) => !prev)} tabIndex={0}>
        <div className={DStyle.upperMenu}>
          <span className={DStyle.valueWrapper}>{value?.label}</span>
        </div>
        <div className={DStyle.iconsContainer}>
          <div className={`${DStyle.arrow} ${isOpen ? DStyle.arrowOpen : ''}`}></div>
        </div>
        <ul className={`${absolute ? DStyle.optionsAbsolute : DStyle.options} ${isOpen ? DStyle.optionsShow : ''}`}>
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={v4()}
              className={`${DStyle.option} ${isOptionSelected(option) ? DStyle.optionSelected : ''} ${
                index === highlightedIndex ? DStyle.optionHighlighted : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)
