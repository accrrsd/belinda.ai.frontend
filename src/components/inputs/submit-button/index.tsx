import { v4 } from 'uuid'
import style from './submit-button.module.css'

type TSubmitButton = {
  imageUrl?: string
  additionalStyle?: string
} & React.HTMLProps<HTMLInputElement>

export const SubmitButton = ({ children, className = style.wrapper, additionalStyle, imageUrl, ...rest }: TSubmitButton) => {
  const id = v4()
  return (
    <label htmlFor={id} className={`${className} ${style.relative} ${additionalStyle ?? ''}`}>
      <input id={id} type="submit" className={style.input} {...rest} />
      {children}
    </label>
  )
}
