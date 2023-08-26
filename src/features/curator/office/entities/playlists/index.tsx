import { useState } from 'react'
import { EmptyContent } from 'src/components/misc/empty-content'

export const CuratorPlaylistsFeature = () => {
  const [empty, setEmpty] = useState(true)

  return empty ? <EmptyContent message="There are no applications yet" to="/curator/add-playlist" buttonText="ADD PLAYLIST" /> : <></>
}
