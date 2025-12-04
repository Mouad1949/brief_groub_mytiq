

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Ticket from './pages/Ticket'
import ProtectedRoute from './Component/ProtectedPage'
import Events from './pages/events'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar';
import Home from './pages/HomePage'
import Dashbord from './pages/Dashbord'
import ErrorSection7 from './components/authorized'

function App() {

  return (
    <>
  <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
         <Route path="/not-authorized" element={<ErrorSection7 />} />
        <Route 
          path="/my-tickets" 
          element={
            <ProtectedRoute allowedRole="user">
              <Ticket />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRole="admin">
              <Dashbord />
            </ProtectedRoute>
          }
        />
      </Routes>

    </>
  )
}

export default App;