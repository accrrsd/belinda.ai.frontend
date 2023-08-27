import { CuratorInformationForm } from 'src/components/forms/curator-information-form'
import style from './style.module.css'

export const CuratorInformationFeature = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <h2 className={style.title}>User's Information</h2>
        <CuratorInformationForm />
      </div>
    </div>
  )
}
