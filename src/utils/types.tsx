import { FieldValues, UseFormReturn } from 'react-hook-form'

export type TDropDownItem = {
  label: string
  value: string
}

export type TSimpleForm<T extends FieldValues> = {
  formHook: UseFormReturn<T, any>
  onSubmit: (data: T) => void
}

export type TModalOverlay = {
  onClick: () => void
  overlayStyle?: string
  removeDefaultOverlayStyle?: boolean
}

export type TPageOffset = {
  top: number
  left: number
}
