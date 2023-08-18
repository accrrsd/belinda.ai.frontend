import { Outlet } from 'react-router-dom'
import { ArtistSideBar } from './entities/sidebar'
import style from './style.module.css'
export default function ArtistOffice() {
  return (
    <div className={style.page}>
      <ArtistSideBar />
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  )
}
