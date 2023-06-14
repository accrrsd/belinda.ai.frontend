import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TDropDownItem } from '../../utils/types'

type TRegistrationFormStage1 = {
  name: string
  email: string
  phone?: string
  artistName: string
  artistLink: string
  Origin: string
}

type TRegistrationFormStage2 = {
  trackName: string

  genre: TDropDownItem
  trackLyricLanguage: TDropDownItem

  songLyricFile: File
  track: File
}

type TRegistrationFormStage3 = {
  trackOverview: string
  similarArtist: string
}

export default function RegistrationFeature() {
  const formHookStage1 = useForm<TRegistrationFormStage1>({ mode: 'all' })
  const formHookStage2 = useForm<TRegistrationFormStage2>({ mode: 'all' })
  const formHookStage3 = useForm<TRegistrationFormStage3>({ mode: 'all' })

  const [stage, setStage] = useState(1)
  switch (stage as 1 | 2 | 3) {
    case 1:
      return <div className=""></div>
    case 2:
      return <div className=""></div>
    case 3:
      return <div className=""></div>
  }
}
