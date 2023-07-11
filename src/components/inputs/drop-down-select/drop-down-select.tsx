import { forwardRef, useRef, useState } from 'react'
import { v4 } from 'uuid'
import { TDropDownItem } from '../../../utils/types'
import style from './drop-down-select.module.css'

type TDropDownSelect = {
  absolute?: boolean
  options: TDropDownItem[]
  onBlur?: (e: React.FocusEvent<any, Element> | void) => void
  isOpenProp?: boolean
  placeholder?: string
  DStyle?: { readonly [key: string]: string }
  value?: TDropDownItem
  error?: boolean
  onChange: (value: TDropDownItem) => void
}

export const DropDownSelect = forwardRef<HTMLDivElement, TDropDownSelect>(
  ({ absolute, options, onBlur, isOpenProp, DStyle = style, value, error, placeholder, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(isOpenProp ?? false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const myRef = useRef<HTMLDivElement | null>(null)

    const onBlurHandler = () => {
      setIsOpen(false)
      onBlur?.()
    }
    const selectOption = (option: TDropDownItem) => (option !== value ? onChange(option) : undefined)
    const isOptionSelected = (option: TDropDownItem) => option.label === value?.label && option.value === value?.value

    const onUpperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsOpen((prev) => !prev)
      if (isOpen) e.currentTarget.blur()
    }

    const duplicateRef = (e: HTMLDivElement | null) => {
      myRef.current = e
      if (!ref) return
      if (typeof ref === 'function') {
        ref(e)
      } else {
        ref.current = e
      }
    }

    return (
      <div className={DStyle.container} ref={duplicateRef} onBlur={onBlurHandler} onClick={onUpperClick} tabIndex={0}>
        <div className={`${DStyle.upperMenu} ${error ? DStyle.upperMenuError : ''}`}>
          <span className={`${DStyle.valueWrapper} ${!value && placeholder ? DStyle.valueWrapperPlaceholder : ''}`}>
            {value ? value.label : placeholder}
          </span>
          <div className={DStyle.iconsContainer}>
            <div className={`${DStyle.arrow} ${isOpen ? DStyle.arrowOpen : ''}`}></div>
          </div>
        </div>
        <ul className={`${absolute ? DStyle.optionsAbsolute : DStyle.options} ${isOpen ? DStyle.optionsShow : ''}`}>
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
                myRef?.current?.blur()
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