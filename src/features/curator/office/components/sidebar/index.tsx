import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from 'src/images/Logo.svg'
import { ReactComponent as PlaylistIcon } from 'src/images/playlistIcon.svg'
import { ReactComponent as UserIcon } from 'src/images/userIcon.svg'

import { NavButton } from 'src/components/inputs/nav-button/nav-button'
import style from './style.module.css'

export const CuratorSideBar = () => {
  const getActiveNavLink = (isActive: boolean) => `${style.navItem} ${isActive ? style.navItemActive : ''}`

  return (
    <div className={style.sideBar}>
      <NavLink to="/">
        <Logo className={style.logo} />
      </NavLink>
      <ul className={style.navList}>
        <li>
          <NavLink to="playlists" className={({ isActive }) => getActiveNavLink(isActive)}>
            <PlaylistIcon className={style.navIcon} />
            My playlists
          </NavLink>
        </li>
        <li>
          <NavLink to="info" className={({ isActive }) => getActiveNavLink(isActive)}>
            <UserIcon className={style.navIcon} />
            User's information
          </NavLink>
        </li>
        <NavButton to="add-playlist" text="ADD PLAYLIST" />
      </ul>
    </div>
  )
}
