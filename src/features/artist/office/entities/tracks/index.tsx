import { useState } from 'react'
import { EmptyContent } from 'src/features/artist/office/components/empty-content/empty-content'

export const ArtistTracksFeature = () => {
  const [empty, setEmpty] = useState(true)

  return empty ? <EmptyContent text="No added tracks yet. Add your first track" to="/artist/add-track" /> : <></>
}
