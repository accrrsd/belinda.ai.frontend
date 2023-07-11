import { useEffect, useState } from 'react'
import { FileInput } from '../../../../components/inputs/file-input'
import { FormTextInput } from '../../../../components/inputs/form-text-input'
import { FormTextAreaInput } from '../../../../components/inputs/form-textArea-input'
import { Notice } from '../../../../components/misc/notice'
import { POSSIBLE_GENRES, POSSIBLE_TRACK_LANGUAGE } from '../../../../utils/constants'
import { RegistrationDropDownSelect } from '../../components/registration-drop-down-select/registration-drop-down-select'
import { RegistrationSubmitButton } from '../../components/registration-submit-button/registration-submit-button'
import { TRegistrationFeatureStage, TRegistrationFormStage2 } from '../../types'
import style from './style.module.css'

const conditions = [`'`, `"`, '`']

export const RegistrationFeatureStage2 = ({ formHook, onSubmit }: TRegistrationFeatureStage<TRegistrationFormStage2>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = formHook

  const [haveTrack, setHaveTrack] = useState(false)
  const [haveLink, setHaveLink] = useState(false)
  const [haveFile, setHaveFile] = useState(false)

  useEffect(() => {
    // Проверяем автозаполнение (дефолтные поля) при инициализации
    if (!!getValues('trackLink')) {
      setHaveLink(true)
    }
  }, [getValues])

  useEffect(() => {
    // Проверяем при изменении полей
    if (haveLink || haveFile) {
      setHaveTrack(true)
    } else {
      setHaveTrack(false)
    }
  }, [haveLink, haveFile])

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <FormTextInput
          title="Enter Your Track Name"
          subtitle="without artists"
          placeholder="Savage Symphony"
          inputName="trackName"
          {...{ register, errors }}
        />
        <RegistrationDropDownSelect
          defaultValueIndex={-1}
          title="Select Genre"
          control={control}
          errors={errors}
          inputName="genre"
          options={POSSIBLE_GENRES}
          placeholder="For example, Hip-Hop"
          absolute
        />
        <RegistrationDropDownSelect
          defaultValueIndex={-1}
          title="Select Track Lyrics Language"
          control={control}
          errors={errors}
          inputName="trackLyricLanguage"
          options={POSSIBLE_TRACK_LANGUAGE}
          placeholder="For example, English"
          absolute
        />
        <FormTextAreaInput rules={{ required: false }} title="Add Your Song Lyrics" inputName="songLyrics" {...{ register, errors }} />
        <Notice additionalStyle={style.lyricNoticeWrapper}>
          <span className={style.lyricNotice}>Optional but it will help us provide a more accurate selection</span>
        </Notice>

        <FormTextInput
          title="Add Your Track"
          placeholder="For example, link from SoundCloud or Spotify"
          inputName="trackLink"
          rules={{
            required: haveTrack ? false : 'Required',
            validate: {
              checkSymbols: (v: string) => (conditions.some((el) => v.includes(el)) ? 'Must not contain ‘ or ”' : true),
              ifItHave: (v: string) => setHaveLink(!!v),
            },
          }}
          {...{ register, errors }}
        />

        <FileInput
          inputName="track"
          accept=".mp3,audio/*"
          {...{ register, errors, setValue }}
          rules={{
            required: haveTrack ? false : 'Required',
            validate: {
              ifItHave: (v: File) => setHaveFile(!!v),
            },
          }}
        />

        <Notice>
          <div className={style.trackNotice}>
            <span className={style.trackNoticeTitle}>Upload your track</span>
            <div className={style.trackNoticeSubtitle}>
              Required if your track is not publicly available on any platform yet. Any type of audio file is accepted, for example .mp3 or .wav
            </div>
          </div>
        </Notice>

        <RegistrationSubmitButton />
      </form>
    </div>
  )
}
