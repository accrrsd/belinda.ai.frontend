import { FormTextInput } from 'src/components/inputs/form-text-input'
import { Notice } from 'src/components/misc/notice'
import { checkIfContainsSpecial, checkUrl } from 'src/utils/functions'
import style from './style.module.css'

import { useState } from 'react'
import { FieldErrors, FieldValues, Path, UseFormRegister, UseFormResetField } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as PlusCircle } from 'src/images/PlusCircle.svg'

type playlistType = { link: string; cost: number }[]

export type TDynamicallyPlaylists = {
  playlists: playlistType
}

type TAddPlaylistDynamically<T extends FieldValues> = {
  linkName: keyof playlistType[number]
  costName: keyof playlistType[number]
  index: number
  denyButton?: boolean
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  onAddClick?: () => void
  onRemoveClick?: (index: number) => void
  resetField: UseFormResetField<T>
}

export const AddPlaylistDynamically = <T extends FieldValues = TDynamicallyPlaylists>({
  linkName,
  costName,
  index,
  register,
  errors,
  onAddClick,
  onRemoveClick,
  resetField,
  denyButton = true,
}: TAddPlaylistDynamically<T>) => {
  const linkInputName = `${'playlists'}.${index}.${linkName}` as Path<T>
  const costInputName = `${'playlists'}.${index}.${costName}` as Path<T>

  // Не через getValues, потому что он ленивый и отрабатывает только между '' и значением (в случае цифры)
  const [linkValue, setLinkValue] = useState('')
  const [costValue, setCostValue] = useState('')

  const navigate = useNavigate()

  const checkValues = () => Boolean(linkValue || costValue)

  const handleClearButton = () => {
    if (checkValues()) {
      resetField(linkInputName)
      resetField(costInputName)
      setLinkValue('')
      setCostValue('')
    } else {
      if (onRemoveClick) onRemoveClick?.(index)
      else {
        navigate('/curator')
      }
    }
  }

  return (
    <div className={style.wrapper}>
      <FormTextInput
        title="Your Playlist Link"
        placeholder="Link from Spotify"
        inputName={linkInputName}
        {...{ register, errors }}
        rules={{
          required: 'Required',
          validate: {
            checkSymbols: (v: string) => checkIfContainsSpecial(v),
            checkLink: (v: string) => checkUrl(v),
          },
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setLinkValue(e.target.value)
          },
        }}
      />

      <div className={style.costWrapper}>
        <span className={style.costTitle}>Cost per Weekly Track Placement</span>
        <FormTextInput
          placeholder="USD"
          min={0}
          type="number"
          inputName={costInputName}
          {...{ register, errors }}
          rules={{
            required: 'Required',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setCostValue(e.target.value)
            },
            valueAsNumber: true,
          }}
        />
        {index === 0 && <Notice>Indicate the amount you'd like to receive for a 7-day placement in your playlist.</Notice>}
      </div>

      <button
        type="button"
        className={`${style.contentButton} ${index === 0 && !checkValues() && denyButton ? style.exitButton : style.clearButton}`}
        onClick={handleClearButton}
      >
        {checkValues() ? 'Clear' : index === 0 && denyButton ? 'Deny' : 'Cancel'}
      </button>

      {onAddClick && (
        <button type="button" className={style.addButton} onClick={onAddClick}>
          <PlusCircle className={style.plusCircle} /> Add another Playlist Link
        </button>
      )}
    </div>
  )
}
