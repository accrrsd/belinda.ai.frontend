import { Outlet } from 'react-router-dom'
import { ArtistSideBar } from './components/sidebar'
import style from './style.module.css'
export default function ArtistOfficeFeature() {
  return (
    <div className={style.page}>
      <ArtistSideBar />
      <div className={style.outlet}>
        <Outlet />
      </div>
    </div>
  )
}
