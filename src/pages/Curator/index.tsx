import { Route, Routes } from 'react-router-dom'
import CuratorOffice from 'src/features/curator/office'
import { CuratorAddPlaylistFeature } from 'src/features/curator/office/entities/add-playlist'
import { CuratorPlaylistsFeature } from 'src/features/curator/office/entities/playlists'

export default function CuratorRoutes() {
  return (
    <Routes>
      <Route path="/registration" element={<></>} />
      <Route path="/" element={<CuratorOffice />}>
        <Route path="info" element={<></>} />
        <Route path="add-playlist" element={<CuratorAddPlaylistFeature />} />
        <Route path="playlists" element={<CuratorPlaylistsFeature />} />
      </Route>
    </Routes>
  )
}
