import { FieldValues, UseFormReturn } from 'react-hook-form'
import { TDropDownItem } from '../../utils/types'

export type TRegistrationFormStage1 = {
  name: string
  email: string
  phone?: string
  artistName: string
  artistLink: string
  origin: string
}

export type TRegistrationFormStage2 = {
  trackName: string

  genre: TDropDownItem
  trackLyricLanguage: TDropDownItem

  songLyrics: string
  track: File
  trackLink: string
}

export type TRegistrationFormStage3 = {
  trackOverview: string
  similarArtist: string
}

export type TRegistrationFeatureStage<T extends FieldValues> = {
  formHook: UseFormReturn<T, any>
  onSubmit: (data: T) => void
}
