import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from '../components/protected-routes/protected-routes'
import RegistrationPage from './registration'
import TitlePage from './title'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)

  useEffect(() => {
    setUserAuthorized(!!localStorage.getItem('userAuthorized'))
  }, [])

  return (
    <Routes>
      <Route path="/" element={<TitlePage />} />
      <Route element={<ProtectedRoutes needCondition={false} condition={userAuthorized} redirect="/" />}>
        <Route path="/registration" element={<RegistrationPage />} />
      </Route>
    </Routes>
  )
}
