import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TestPage from '@pages/Test'
import HotelList from '@pages/HotelList'
import Hotel from '@pages/Hotel'
import useLoadKakao from '@hooks/useLoadKakao'

function App() {
  useLoadKakao()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
