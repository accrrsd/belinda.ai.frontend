import style from './nav-button.module.css'

type TNavButton = {
  text?: string
  additionalStyle?: string
} & React.HTMLProps<HTMLButtonElement>

export const NavButton = ({ text = 'ADD TRACK', additionalStyle, type, ...rest }: TNavButton) => {
  return (
    <button type="button" className={`${style.navButton} ${additionalStyle}`} {...rest}>
      {text}
    </button>
  )
}
