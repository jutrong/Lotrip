import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PrivateRoute from '@components/auth/PrivateRoute'
import TestPage from '@pages/Test'
import HotelList from '@pages/HotelList'
import HotelDetail from '@pages/Hotel'
import MyPage from '@pages/My'
import SigninPage from '@pages/Signin'
import useLoadKakao from '@hooks/useLoadKakao'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@components/shared/Navbar'
import SettingPage from '@pages/settings'
import LikePage from '@pages/settings/like'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <AuthGuard>
        <Navbar />
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route
            path="/my"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/like"
            element={
              <PrivateRoute>
                <LikePage />
              </PrivateRoute>
            }
          />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AuthGuard>
    </BrowserRouter>
  )
}

export default App
