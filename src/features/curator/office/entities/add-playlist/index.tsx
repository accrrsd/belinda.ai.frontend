import { useFieldArray, useForm } from 'react-hook-form'
import { AddPlaylistDynamically, TDynamicallyPlaylists } from 'src/components/forms/add-playlist-dynamically'
import { SubmitButton } from 'src/components/inputs/submit-button'
import style from './add-playlist.module.css'

export const CuratorAddPlaylistFeature = () => {
  const formHook = useForm<TDynamicallyPlaylists>({
    mode: 'all',
    defaultValues: {
      playlists: [{ link: '', cost: NaN }],
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    control,
  } = formHook

  const { fields, append, remove } = useFieldArray({ control, name: 'playlists' })

  const handleRemoveClick = (index: number) => remove(index)
  const handleAddClick = () => append({ link: '', cost: NaN }, { shouldFocus: false })

  const createPlaylistForms = () =>
    fields.map((field, index) => {
      const onAddClick = index === fields.length - 1 ? handleAddClick : undefined
      const onRemoveClick = index !== 0 ? handleRemoveClick : undefined

      return (
        <AddPlaylistDynamically
          {...{ register, errors, index, resetField, onAddClick, onRemoveClick }}
          linkName="link"
          costName="cost"
          key={field.id}
        />
      )
    })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className={style.content}>
      <span className={style.title}>Add track</span>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        {createPlaylistForms()}
        <SubmitButton children="Continue" additionalStyle={style.submitText} />
      </form>
    </div>
  )
}
