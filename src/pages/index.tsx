import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from '../components/protected-routes/protected-routes'
import LoginPage from './login'
import RegistrationPage from './registration'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)

  useEffect(() => {
    setUserAuthorized(!!localStorage.getItem('userAuthorized'))
  }, [])

  return (
    <Routes>
      <Route element={<ProtectedRoutes needCondition={false} condition={userAuthorized} redirect="/" />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Route>
    </Routes>
  )
}
