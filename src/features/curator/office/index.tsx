import { Outlet } from 'react-router-dom'
import { CuratorSideBar } from './components/sidebar'
import style from './style.module.css'

export default function CuratorOffice() {
  return (
    <div className={style.page}>
      <CuratorSideBar />
      <div className={style.outlet}>
        <Outlet />
      </div>
    </div>
  )
}
