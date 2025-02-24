import { Route, Routes } from 'react-router'
import { Home } from '../pages/home'
import { Calendar } from '../pages/calendar'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="calendar" element={<Calendar />} />

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}
    </Routes>
  )
}
