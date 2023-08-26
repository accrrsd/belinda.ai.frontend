import { Route, Routes } from 'react-router-dom'
import ArtistOfficeFeature from 'src/features/artist/office'
import { ArtistAddTrackFeature } from 'src/features/artist/office/entities/add-track'
import { ArtistInformationFeature } from 'src/features/artist/office/entities/info'
import { ArtistRequestsFeature } from 'src/features/artist/office/entities/requests'
import { ArtistTracksFeature } from 'src/features/artist/office/entities/tracks'
import ArtistRegistrationFeature from 'src/features/artist/registration'
import NotFoundFeature from 'src/features/not-found'

export default function ArtistRoutes() {
  return (
    <Routes>
      <Route path="/registration" element={<ArtistRegistrationFeature />} />
      <Route path="/" element={<ArtistOfficeFeature />}>
        <Route path="requests" element={<ArtistRequestsFeature />} />
        <Route path="tracks" element={<ArtistTracksFeature />} />
        <Route path="info" element={<ArtistInformationFeature />} />
        <Route path="add-track" element={<ArtistAddTrackFeature />} />
      </Route>
      <Route path="*" element={<NotFoundFeature />} />
    </Routes>
  )
}
