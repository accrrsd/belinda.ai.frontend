import { Route, Routes } from 'react-router-dom'
import ArtistOffice from 'src/features/artist/office'
import { ArtistAddTrack } from 'src/features/artist/office/entities/add-track'
import { ArtistInformation } from 'src/features/artist/office/entities/info'
import { ArtistRequests } from 'src/features/artist/office/entities/requests'
import { ArtistTracks } from 'src/features/artist/office/entities/tracks'
import ArtistRegistrationFeature from 'src/features/artist/registration'
import NotFoundFeature from 'src/features/not-found'

export default function ArtistRoutes() {
  return (
    <Routes>
      <Route path="/registration" element={<ArtistRegistrationFeature />} />
      <Route path="/" element={<ArtistOffice />}>
        <Route path="requests" element={<ArtistRequests />} />
        <Route path="tracks" element={<ArtistTracks />} />
        <Route path="info" element={<ArtistInformation />} />
        <Route path="add-track" element={<ArtistAddTrack />} />
      </Route>
      <Route path="*" element={<NotFoundFeature />} />
    </Routes>
  )
}
