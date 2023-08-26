import { useState } from 'react'
import { EmptyContent } from 'src/components/misc/empty-content'

export const ArtistTracksFeature = () => {
  const [empty, setEmpty] = useState(true)

  return empty ? <EmptyContent message="No added tracks yet. Add your first track" to="/artist/add-track" /> : <></>
}
