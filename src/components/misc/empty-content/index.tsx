import { NavLink } from 'react-router-dom'
import { NavButton } from 'src/components/inputs/nav-button/nav-button'
import style from './style.module.css'

export const EmptyContent = ({ message, to = '/', buttonText }: { message: string; to: string; buttonText?: string }) => {
  return (
    <div className={style.wrapper}>
      <span className={style.message}>{message}</span>
      <NavLink to={to} style={{ width: '340px' }}>
        <NavButton text={buttonText} />
      </NavLink>
    </div>
  )
}
