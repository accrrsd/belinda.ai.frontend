import { Route, Routes } from 'react-router-dom'
import LoginPage from './login'
import RegistrationPage from './registration'

export default function app() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  )
}
