import { FormTextInput } from 'src/components/inputs/form-text-input'
import { Notice } from 'src/components/misc/notice'
import { checkIfContainsSpecial, checkUrl } from 'src/utils/functions'
import style from './style.module.css'

import { useState } from 'react'
import { FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormResetField } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as PlusCircle } from 'src/images/PlusCircle.svg'

export type TDynamicallyPlaylists = {
  playlists: { link: string; cost: number }[]
}

type TAddPlaylistDynamically<T extends FieldValues> = {
  generalName: keyof T
  linkName: keyof T[keyof T][number]
  costName: keyof T[keyof T][number]
  index: number
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  onAddClick?: () => void
  onRemoveClick?: (index: number) => void
  getValues: UseFormGetValues<T>
  resetField: UseFormResetField<T>
}

export const AddPlaylistDynamically = ({
  generalName,
  linkName,
  costName,
  index,
  register,
  errors,
  onAddClick,
  onRemoveClick,
  resetField,
}: TAddPlaylistDynamically<TDynamicallyPlaylists>) => {
  type TVariableName = `${typeof generalName}.${typeof index}.${typeof linkName | typeof costName}`
  const linkInputName = `${generalName}.${index}.${linkName}` as TVariableName
  const costInputName = `${generalName}.${index}.${costName}` as TVariableName

  // Не через getValues, потому что он ленивый и отрабатывает только между '' и значением (в случае цифры)
  const [linkValue, setLinkValue] = useState('')
  const [costValue, setCostValue] = useState('')

  const navigate = useNavigate()

  const checkValues = () => Boolean(linkValue || costValue)

  const handleClearButton = () => {
    if (checkValues()) {
      resetField(linkInputName)
      resetField(costInputName)
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
        className={`${style.contentButton} ${index === 0 && !checkValues() ? style.exitButton : style.clearButton}`}
        onClick={handleClearButton}
      >
        {checkValues() ? 'Clear' : index === 0 ? 'Deny' : 'Cancel'}
      </button>

      {onAddClick && (
        <button type="button" className={style.addButton} onClick={onAddClick}>
          <PlusCircle className={style.plusCircle} /> Add another Playlist Link
        </button>
      )}
    </div>
  )
}
