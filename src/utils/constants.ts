import { TDropDownItem } from './types'

export const EmailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

export const POSSIBLE_GENRES: TDropDownItem[] = [
  { label: 'Blues', value: 'Blues' },
  { label: 'Classical', value: 'Classical' },
  { label: 'Country', value: 'Country' },
  { label: 'Disco', value: 'Disco' },
  { label: 'Hip-hop', value: 'Hip-hop' },
  { label: 'Jazz', value: 'Jazz' },
  { label: 'Metal', value: 'Metal' },
  { label: 'Pop', value: 'Pop' },
  { label: 'Reggae', value: 'Reggae' },
  { label: 'Rock', value: 'Rock' },
]

export const POSSIBLE_TRACK_LANGUAGE: TDropDownItem[] = [
  { label: 'English', value: 'English' },
  { label: 'Русский', value: 'Russian' },
]
