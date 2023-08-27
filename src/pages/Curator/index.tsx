import { Route, Routes } from 'react-router-dom'
import CuratorOffice from 'src/features/curator/office'
import { CuratorAddPlaylistFeature } from 'src/features/curator/office/entities/add-playlist'
import { CuratorInformationFeature } from 'src/features/curator/office/entities/info'
import { CuratorPlaylistsFeature } from 'src/features/curator/office/entities/playlists'
import { CuratorRegistrationFeature } from 'src/features/curator/registration'
import NotFoundFeature from 'src/features/not-found'

export default function CuratorRoutes() {
  return (
    <Routes>
      <Route path="/registration" element={<CuratorRegistrationFeature />} />
      <Route path="/" element={<CuratorOffice />}>
        <Route path="info" element={<CuratorInformationFeature />} />
        <Route path="add-playlist" element={<CuratorAddPlaylistFeature />} />
        <Route path="playlists" element={<CuratorPlaylistsFeature />} />
      </Route>
      <Route path="*" element={<NotFoundFeature />} />
    </Routes>
  )
}
