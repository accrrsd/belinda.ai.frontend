import { Outlet } from 'react-router-dom'
import { ArtistSideBar } from './components/sidebar'
import style from './style.module.css'

export default function CuratorOffice() {
  return (
    <div className={style.page}>
      <ArtistSideBar />
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  )
}
