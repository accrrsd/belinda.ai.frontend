import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NavButton } from 'src/components/inputs/nav-button/nav-button'
import style from './style.module.css'

export const ArtistTracks = () => {
  const [empty, setEmpty] = useState(true)

  const emptyHandler = () => (
    <div className={style.emptyWrapper}>
      <span className={style.message}>No added tracks yet. Add your first track</span>
      <NavLink to="add-track">
        <NavButton />
      </NavLink>
    </div>
  )

  return empty ? emptyHandler() : <></>
}
