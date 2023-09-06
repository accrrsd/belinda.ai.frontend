import { useForm } from 'react-hook-form'
import { CuratorInformationForm, TCuratorInfoForm } from 'src/components/forms/curator-information-form'
import style from './style.module.css'

export const CuratorRegistrationFeature = () => {
  const formHook = useForm<TCuratorInfoForm>({
    mode: 'all',
    defaultValues: {
      playlists: [{ link: '', cost: NaN }],
    },
  })

  const onSubmit = () => {}

  return (
    <div className={style.page}>
      <div className={style.content}>
        <h2 className={style.title}>Registration form</h2>
        <CuratorInformationForm {...{ formHook, onSubmit }} passwordField />
      </div>
    </div>
  )
}
