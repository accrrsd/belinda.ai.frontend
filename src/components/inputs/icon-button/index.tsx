import { ReactComponent as PlusIcon } from 'src/images/PlusCircle.svg'
import style from './style.module.css'

type TIconButton = {
  children: React.ReactNode
  rotatePlus?: true
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton = ({ children, type, rotatePlus, ...rest }: TIconButton) => {
  return (
    <button type={type || 'button'} {...rest} className={style.wrapper}>
      <PlusIcon className={`${style.plusIcon} ${rotatePlus ? style.rotatePlus : ''}`} />
      {children}
    </button>
  )
}
