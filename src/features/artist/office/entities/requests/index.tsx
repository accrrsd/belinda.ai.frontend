import { useState } from 'react'
import { EmptyContent } from 'src/features/artist/office/components/empty-content/empty-content'

export const ArtistRequests = () => {
  const [empty, setEmpty] = useState(true)

  return empty ? <EmptyContent text="No active requests yet. Add your first track" to="/artist/add-track" /> : <></>
}
