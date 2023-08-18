import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ArtistRegistrationForm } from './form'
import { TArtistRegistration } from './types'

export default function ArtistRegistrationFeature() {
  const navigate = useNavigate()

  const getDefaultValuesFromLocal = (itemName: string) => {
    const data = localStorage.getItem(itemName)
    return data ? JSON.parse(data) : null
  }

  const formHook = useForm<TArtistRegistration>({ mode: 'all', defaultValues: getDefaultValuesFromLocal('regStage1Data') })

  const onSubmit = (data: TArtistRegistration) => {
    localStorage.setItem('regStage1Data', JSON.stringify(data))
  }

  return <ArtistRegistrationForm formHook={formHook} onSubmit={(d: TArtistRegistration) => onSubmit(d)} />
}
