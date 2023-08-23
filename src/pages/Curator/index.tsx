import { Route, Routes } from 'react-router-dom'

export default function CuratorRoutes() {
  return (
    <Routes>
      <Route path="/registration" element={<></>} />
      <Route path="/" element={<></>}>
        <Route path="info" element={<></>} />
      </Route>
    </Routes>
  )
}
