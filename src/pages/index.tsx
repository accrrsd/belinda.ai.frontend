import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from '../components/protected-routes/protected-routes'
import ArtistRoutes from './Artist'
import CardPage from './card'
import NotFoundPage from './not-found'
import PlaylistPage from './playlist'
import TitlePage from './title'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)

  useEffect(() => {
    setUserAuthorized(!!sessionStorage.getItem('userAuthorized'))
  }, [])

  return (
    <Routes>
      <Route path="/" element={<TitlePage />} />
      <Route path="/artist/*" element={<ArtistRoutes />} />

      <Route element={<ProtectedRoutes needCondition={true} condition={userAuthorized} redirect="/" />}>
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/card" element={<CardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
