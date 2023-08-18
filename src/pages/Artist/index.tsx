import { Route, Routes } from 'react-router-dom'
import ArtistOffice from 'src/features/artist/office'
import { ArtistAddTrack } from 'src/features/artist/office/entities/add-track'
import { ArtistRequests } from 'src/features/artist/office/entities/requests'
import ArtistRegistrationFeature from 'src/features/artist/registration'
import NotFoundPage from '../not-found'

export default function ArtistRoutes() {
  return (
    <Routes>
      <Route path="/registration" element={<ArtistRegistrationFeature />} />
      <Route path="/" element={<ArtistOffice />}>
        <Route path="requests" element={<ArtistRequests />} />
        <Route path="tracks" element={<></>} />
        <Route path="info" element={<></>} />
        <Route path="add-track" element={<ArtistAddTrack />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
