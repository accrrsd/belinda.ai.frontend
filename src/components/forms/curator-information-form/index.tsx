import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { FormTextInput } from 'src/components/inputs/form-text-input'
import { IconButton } from 'src/components/inputs/icon-button'
import { IconTextInput } from 'src/components/inputs/icon-text-input'
import { ReactComponent as FacebookIcon } from 'src/images/facebookIcon.svg'
import { ReactComponent as InstagramIcon } from 'src/images/instagramIcon.svg'
import { ReactComponent as TikTokIcon } from 'src/images/tikTokIcon.svg'
import { EmailRegExp } from 'src/utils/constants'
import { checkIfContainsSpecial, checkUrl } from 'src/utils/functions'
import { v4 } from 'uuid'
import { AddPlaylistDynamically } from '../add-playlist-dynamically'
import style from './style.module.css'

type possibleSocialNames = 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'tikTok'

type TCuratorInfoForm = {
  playlists: { link: string; cost: number }[]
  socialLinks: { name: possibleSocialNames; link: string }[]

  name: string
  email: string
  phone?: string
  origin: string
}

export const CuratorInformationForm = () => {
  const [socialButtons, setSocialButtons] = useState<possibleSocialNames[]>(['facebook', 'instagram', 'tikTok'])

  const formHook = useForm<TCuratorInfoForm>({
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
    setValue,
  } = formHook

  const { fields: playlistsFields, append: appendPlaylist, remove: removePlaylist } = useFieldArray({ control, name: 'playlists' })

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({ control, name: 'socialLinks' })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const appendButton = (name: possibleSocialNames) => setSocialButtons((prev) => [...prev, name])

  const removeButton = (name: possibleSocialNames) => setSocialButtons((prev) => [...prev.filter((itemName) => itemName !== name)])

  const handleAppendPlaylist = () => appendPlaylist({ link: '', cost: NaN }, { shouldFocus: false })
  const handleRemovePlaylist = (index: number) => removePlaylist(index)

  const handleAppendSocial = (name: possibleSocialNames) => {
    appendSocial({ name, link: '' }, { shouldFocus: false })
    removeButton(name)
  }

  const handleRemoveSocial = (index: number, name: possibleSocialNames) => {
    removeSocial(index)
    appendButton(name)
  }

  const findIconElemByName = (name: possibleSocialNames) => {
    switch (name) {
      case 'instagram':
        return <InstagramIcon />
      case 'youtube':
        return <></>
      case 'facebook':
        return <FacebookIcon />
      case 'twitter':
        return <></>
      case 'tikTok':
        return <TikTokIcon />
    }
  }

  const createPlaylists = () =>
    playlistsFields.map((field, index) => {
      const onAddClick = index === playlistsFields.length - 1 ? handleAppendPlaylist : undefined
      const onRemoveClick = index !== 0 ? handleRemovePlaylist : undefined

      return (
        <AddPlaylistDynamically<TCuratorInfoForm>
          {...{ register, errors, index, resetField, onAddClick, onRemoveClick }}
          denyButton={false}
          linkName="link"
          costName="cost"
          key={field.id}
        />
      )
    })

  const createSocials = () =>
    socialFields.map((field, index) => {
      return (
        <IconTextInput
          inputName={`socialLinks.${index}.link`}
          {...{ register, errors }}
          rules={{
            required: 'Required',
            validate: {
              checkSymbols: (v: string) => checkIfContainsSpecial(v),
              checkLink: (v: string) => checkUrl(v),
            },
          }}
          placeholder="Link"
          key={field.id}
        >
          <IconButton rotatePlus onClick={() => handleRemoveSocial(index, field.name)}>
            {findIconElemByName(field.name)}
          </IconButton>
        </IconTextInput>
      )
    })

  const createButtons = () =>
    socialButtons.map((name, index) => {
      return (
        <IconButton onClick={() => handleAppendSocial(name)} key={v4()}>
          {findIconElemByName(name)}
        </IconButton>
      )
    })

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.playlistsWrapper}>{createPlaylists()}</div>
      <div className={style.userInfoWrapper}>
        <FormTextInput title="Your Name" placeholder="David" inputName="name" {...{ register, errors }} />

        <FormTextInput
          title="Your Email Address"
          placeholder="For example, dmicofficial@gmail.com"
          inputName="email"
          {...{ register, errors }}
          validateRules={{
            validate: {
              checkEmail: (v: string) => (EmailRegExp.test(v) ? true : 'Incorrect Email Address'),
            },
          }}
        />

        <FormTextInput
          title="Your Phone Number"
          placeholder="+1 555 123 4567"
          subtitle="Optional"
          inputName="phone"
          onChange={(e) => {
            const currentValue = e.currentTarget.value
            const clearCurrentValue = currentValue.replace(' ', '')
            const formattedPhone = new AsYouType().input(clearCurrentValue)
            if (formattedPhone) setValue('phone', formattedPhone)
          }}
          validateRules={{
            required: false,
            validate: {
              checkPhoneNumber: (v: string) => (!v ? true : isValidPhoneNumber(v) ? true : 'Incorrect Phone Number'),
            },
          }}
          {...{ register, errors }}
        />

        <FormTextInput title="Enter Your Origin" placeholder="For example, Los Angeles, California" inputName="origin" {...{ register, errors }} />
      </div>
      <div className={style.iconsWrapper}>
        <span className={style.iconsTitle}>Social Media Links</span>
        <div className={style.iconsContainer}>{createButtons()}</div>
      </div>

      <div className={style.socialInputsWrapper}>{createSocials()}</div>
    </form>
  )
}
