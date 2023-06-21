import { v4 } from 'uuid'
import style from './submit-button.module.css'

type TSubmitButton = {
  imageUrl?: string
} & React.HTMLProps<HTMLInputElement>

export const SubmitButton = ({ children, className = style.wrapper, imageUrl, ...rest }: TSubmitButton) => {
  const id = v4()
  return (
    <label htmlFor={id} className={`${className} ${style.relative}`}>
      <input id={id} type="submit" className={style.input} {...rest} />
      {children}
    </label>
  )
}
