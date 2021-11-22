import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App
