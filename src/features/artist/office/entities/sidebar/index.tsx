import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from 'src/images/Logo.svg'
import { ReactComponent as MusicIcon } from 'src/images/musicIcon.svg'
import { ReactComponent as RequestIcon } from 'src/images/requestIcon.svg'
import { ReactComponent as UserIcon } from 'src/images/userIcon.svg'

import { NavButton } from 'src/components/inputs/nav-button/nav-button'
import style from './style.module.css'

export const ArtistSideBar = () => {
  const getActiveNavLink = (isActive: boolean) => `${style.navItem} ${isActive ? style.navItemActive : ''}`

  return (
    <div className={style.sideBar}>
      <NavLink to="/">
        <Logo className={style.logo} />
      </NavLink>
      <ul className={style.navList}>
        <li>
          <NavLink to="requests" className={({ isActive }) => getActiveNavLink(isActive)}>
            <RequestIcon className={style.navIcon} />
            Requests
          </NavLink>
        </li>
        <li>
          <NavLink to="tracks" className={({ isActive }) => getActiveNavLink(isActive)}>
            <MusicIcon className={style.navIcon} />
            My Tracks
          </NavLink>
        </li>
        <li>
          <NavLink to="info" className={({ isActive }) => getActiveNavLink(isActive)}>
            <UserIcon className={style.navIcon} />
            User's Information
          </NavLink>
        </li>
        <NavLink style={{ width: `100%` }} to="add-track">
          <NavButton />
        </NavLink>
      </ul>
    </div>
  )
}
