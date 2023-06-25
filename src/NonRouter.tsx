import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Otp from './pages/Otp'

function NonRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/otp' element={<Otp />}></Route>
    </Routes>
  )
}

export default NonRouter
