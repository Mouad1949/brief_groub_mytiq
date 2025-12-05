

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Ticket from './pages/Ticket'
import ProtectedRoute from './Component/ProtectedPage'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';

function App() {

  return (
    <>
    <Routes>
      <Navbar />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/tickets' element={<ProtectedRoute allowedRole="admin"><Ticket /></ProtectedRoute>} />
      <Route path='/events' element={<ProtectedRoute allowedRole="user"><Events /></ProtectedRoute>} />
      <Route path="/event/:id" element={<EventDetailsPage />} />
      <Route path="/" element={<HomePage/>}/>
    </Routes>
    </>
  )
}

export default App;