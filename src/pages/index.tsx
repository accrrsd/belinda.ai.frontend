import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import CardFeature from 'src/features/card'
import NotFoundFeature from 'src/features/not-found'
import PlaylistFeature from 'src/features/playlist'
import TitlePageFeature from 'src/features/title-page'
import { ProtectedRoutes } from '../components/protected-routes/protected-routes'
import ArtistRoutes from './Artist'
import CuratorRoutes from './Curator'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)

  useEffect(() => {
    setUserAuthorized(!!sessionStorage.getItem('userAuthorized'))
  }, [])

  return (
    <Routes>
      <Route path="/" element={<TitlePageFeature />} />
      <Route path="/artist/*" element={<ArtistRoutes />} />
      <Route path="/curator/*" element={<CuratorRoutes />} />

      <Route element={<ProtectedRoutes needCondition={true} condition={userAuthorized} redirect="/" />}>
        <Route path="/playlist" element={<PlaylistFeature />} />
        <Route path="/card" element={<CardFeature />} />
      </Route>
      <Route path="*" element={<NotFoundFeature />} />
    </Routes>
  )
}
