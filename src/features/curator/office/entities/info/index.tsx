import { useForm } from 'react-hook-form'
import { CuratorInformationForm, TCuratorInfoForm } from 'src/components/forms/curator-information-form'
import style from './style.module.css'

export const CuratorInformationFeature = () => {
  const formHook = useForm<TCuratorInfoForm>({
    mode: 'all',
    defaultValues: {
      playlists: [{ link: '', cost: NaN }],
    },
  })

  const onSubmit = () => {}

  const playListSettings = { redirectOnRemoveFirst: '/curator', denyButton: true }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <h2 className={style.title}>User's Information</h2>
        <CuratorInformationForm {...{ formHook, onSubmit, playListSettings }} />
      </div>
    </div>
  )
}
