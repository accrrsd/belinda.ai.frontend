import { useState } from 'react'
import { EmptyContent } from 'src/components/misc/empty-content'

export const ArtistRequestsFeature = () => {
  const [empty, setEmpty] = useState(true)

  return empty ? <EmptyContent message="No active requests yet. Add your first track" to="/artist/add-track" /> : <></>
}
