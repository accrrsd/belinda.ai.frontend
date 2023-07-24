import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from '../components/protected-routes/protected-routes'
import CardPage from './card'
import NotFoundPage from './not-found'
import PlaylistPage from './playlist'
import RegistrationPage from './registration'
import TitlePage from './title'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)

  useEffect(() => {
    setUserAuthorized(!!sessionStorage.getItem('userAuthorized'))
  }, [])

  return (
    <Routes>
      <Route path="/" element={<TitlePage />} />
      <Route element={<ProtectedRoutes needCondition={false} condition={userAuthorized} redirect="/" />}>
        <Route path="/registration" element={<RegistrationPage />} />
      </Route>
      <Route element={<ProtectedRoutes needCondition={true} condition={userAuthorized} redirect="/" />}>
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/card" element={<CardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
