import { useForm } from 'react-hook-form'
import { ArtistInformationForm, TArtistInformation } from '../../../components/forms/artist-information-form'
import style from './style.module.css'

export default function ArtistRegistrationFeature() {
  const getDefaultValuesFromLocal = (itemName: string) => {
    const data = localStorage.getItem(itemName)
    return data ? JSON.parse(data) : null
  }

  // todo сделать запрос на сервер об информации пользователя и сохранить его в локалстордж
  //@ts-ignore:next-line
  const formHook = useForm<TArtistInformation>({ mode: 'all', defaultValues: getDefaultValuesFromLocal('ArtistInfo') })

  const onSubmit = (data: TArtistInformation) => {}

  return (
    <div className={style.page}>
      <div className={style.content}>
        <div className={style.titleWrapper}>
          <span className={style.title}>Registration Form</span>
        </div>
        <div className={style.wrapper}>
          <ArtistInformationForm formHook={formHook} onSubmit={(d: TArtistInformation) => onSubmit(d)} />
        </div>
      </div>
    </div>
  )
}
