import { useRef, useState } from 'react'
import { FieldErrors, FieldValues, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { v4 } from 'uuid'
import { ReactComponent as TableImage } from '../../../images/Table.svg'
import { checkError, getFinallyRules } from '../../../utils/functions'
import style from './file-input.module.css'

type TFileInput<T extends FieldValues> = {
  register: UseFormRegister<T>
  inputName: Path<T>
  rules?: object
  additionalRules?: object
  errors: FieldErrors<T>
  setValue: UseFormSetValue<T>
  setSingleValue?: boolean
  fileTypeForDrop?: string
  DStyle?: { readonly [key: string]: string }
} & React.HTMLProps<HTMLInputElement>

const defaultRules = {
  required: 'Required',
}

export const FileInput = <T extends FieldValues>({
  register,
  inputName,
  rules = defaultRules,
  additionalRules,
  errors,
  children,
  onChange,
  onBlur,
  setValue,
  accept = '.mp3,audio/*',
  fileTypeForDrop = 'audio',
  setSingleValue = true,
  DStyle = style,
  ...rest
}: TFileInput<T>) => {
  const error = checkError(inputName, errors)
  const finallyRules = getFinallyRules(rules, additionalRules)
  const [fileName, setFileName] = useState<string | undefined>(undefined)
  const [dragActive, setDragActive] = useState(false)

  const [uuid] = useState(v4())
  const myRef = useRef<HTMLInputElement | null>(null)

  const { onChange: onChangeRegister, onBlur: onBlurRegister, name, ref } = register(inputName, finallyRules)

  const duplicateRef = (e: HTMLInputElement | null) => {
    myRef.current = e
    if (!ref) return
    if (typeof ref === 'function') {
      ref(e)
    } else {
      //@ts-ignore:next-line
      ref.current = e
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files) {
      if (e.dataTransfer.files.item(0)?.type.includes(fileTypeForDrop)) {
        const ev2 = new Event('change', { bubbles: true })
        myRef.current!.files = e.dataTransfer.files
        myRef.current!.dispatchEvent(ev2)
      }
    }
  }

  const setSingleValueFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files || !files.item(0)) return
    setFileName(files.item(0)!.name)
    //@ts-ignore:next-line
    setValue(inputName, files.item(0)!)
  }

  const customOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.files)
    onChangeRegister(e)
    onChange?.(e)
    setSingleValue && setSingleValueFunc(e)
  }

  const customOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlurRegister(e)
    onBlur?.(e)
  }

  const restProps = { name, accept }

  return (
    <label
      htmlFor={uuid}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`${DStyle.wrapper} ${dragActive ? DStyle.wrapperHover : ''} ${checkError(inputName, errors) ? DStyle.wrapperError : ''}`}
    >
      <input
        type="file"
        className={`${DStyle.input} ${error ? DStyle.errorInput : ''}`}
        ref={duplicateRef}
        onChange={customOnChange}
        onBlur={customOnBlur}
        {...restProps}
        {...rest}
        id={uuid}
      />
      {children ?? (
        <div className={DStyle.defaultChild}>
          <TableImage />
          <span className={DStyle.defaultText}>{fileName ?? 'or Drop file here'}</span>
        </div>
      )}
    </label>
  )
}
