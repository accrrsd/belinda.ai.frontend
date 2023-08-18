import { NavLink } from 'react-router-dom'
import { NavButton } from 'src/components/inputs/nav-button/nav-button'
import style from './empty-content.module.css'

export const EmptyContent = ({ text, to = '/artist/add-track' }: { text: string; to: string }) => {
  return (
    <div className={style.wrapper}>
      <span className={style.message}>{text}</span>
      <NavLink to={to} style={{ width: '340px' }}>
        <NavButton />
      </NavLink>
    </div>
  )
}
