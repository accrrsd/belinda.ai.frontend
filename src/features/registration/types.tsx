import { TDropDownItem } from '../../utils/types'

export type TRegistrationFormStage1 = {
  name: string
  email: string
  phone?: string
  artistName: string
  artistLink: string
  Origin: string
}

export type TRegistrationFormStage2 = {
  trackName: string

  genre: TDropDownItem
  trackLyricLanguage: TDropDownItem

  songLyricFile: File
  track: File
}

export type TRegistrationFormStage3 = {
  trackOverview: string
  similarArtist: string
}
