import { Calendar } from '@/pages/calendar'
import { Home } from '@/pages/home'
import { Route, Routes } from 'react-router'

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
