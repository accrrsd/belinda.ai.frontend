import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArtistInformationForm, TArtistInformation } from 'src/components/forms/artist-information-form'
import { ReactComponent as CloseIcon } from 'src/images/Xicon.svg'
import { ArtistInfoConfirmModal } from './components/confirmModal'
import style from './style.module.css'

export const ArtistInformation = () => {
  const [openModal, setOpenModal] = useState(false)
  const getDefaultValuesFromLocal = (itemName: string) => {
    const data = localStorage.getItem(itemName)
    return data ? JSON.parse(data) : null
  }

  // todo сделать запрос на сервер об информации пользователя и сохранить его в локалстордж
  //@ts-ignore:next-line
  const formHook = useForm<TArtistInformation>({ mode: 'all', defaultValues: getDefaultValuesFromLocal('ArtistInfo') })

  const onSubmit = (data: TArtistInformation) => {}

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <h2 className={style.title}>
          User's Information
          <button type="button" className={style.closeButton} onClick={() => setOpenModal(true)}>
            <CloseIcon />
          </button>
        </h2>
        <ArtistInformationForm formHook={formHook} onSubmit={(d: TArtistInformation) => onSubmit(d)} />
      </div>
      {openModal && <ArtistInfoConfirmModal {...{ setOpenModal }} />}
    </div>
  )
}
