import { useNavigate } from 'react-router-dom'
import style from './nav-button.module.css'

type TNavButton = {
  text?: string
  additionalStyle?: string
  to?: string
} & React.HTMLProps<HTMLButtonElement>

export const NavButton = ({ text = 'ADD TRACK', additionalStyle, to, onClick, type, ...rest }: TNavButton) => {
  const navigate = useNavigate()

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick?.(e)
    to && navigate(to)
  }
  return (
    <button type="button" className={`${style.navButton} ${additionalStyle}`} onClick={onClickHandler} {...rest}>
      {text}
    </button>
  )
}
