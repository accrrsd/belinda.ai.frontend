import { CuratorInformationForm } from 'src/components/forms/curator-information-form'
import style from './style.module.css'

export const CuratorRegistrationFeature = () => {
  return (
    <div className={style.page}>
      <div className={style.content}>
        <h2 className={style.title}>Registration form</h2>
        <CuratorInformationForm />
      </div>
    </div>
  )
}
