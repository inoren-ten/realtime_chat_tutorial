import React from 'react'
import { Route, Routes,  } from 'react-router-dom'
import Messages from './pages/Messages'
import Room from './pages/Room'

function Router() {
  return (
    <Routes>
        <Route path='/' element={<Messages />}></Route>
        <Route path='/room/:id' element={<Room />}></Route>
    </Routes>
  )
}

export default Router
