
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Ticket from './pages/Ticket'
import ProtectedRoute from './Component/ProtectedPage'
import Events from './pages/events'

function App() {

  return (
    <>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/tickets' element={<ProtectedRoute allowedRole="admin"><Ticket /></ProtectedRoute>} />
      <Route path='/events' element={<ProtectedRoute allowedRole="user"><Events /></ProtectedRoute>} />
    </Routes>
    </>
  )
}

export default App
