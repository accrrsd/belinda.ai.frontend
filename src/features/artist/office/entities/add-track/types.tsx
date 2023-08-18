import { FieldValues, UseFormReturn } from 'react-hook-form'
import { TDropDownItem } from 'src/utils/types'

export type TArtistAddTrackStage1 = {
  trackName: string

  genre: TDropDownItem
  trackLyricLanguage: TDropDownItem

  songLyrics: string
  track?: File
  trackLink?: string
}

export type TArtistAddTrackStage2 = {
  trackOverview: string
  similarArtist: string
}

export type TArtistAddTrackStageFeat<T extends FieldValues> = {
  formHook: UseFormReturn<T, any>
  onSubmit: (data: T) => void
}
