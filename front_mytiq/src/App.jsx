import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEventPage from './pages/AddEventPage';
import DashboardPage from './pages/DashboardPage';
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Ticket from './pages/Ticket'
import ProtectedRoute from './utils/ProtectedPage'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar';
import Dashbord from './pages/Dashbord'
import ErrorSection7 from './components/authorized'
import EventDetailsPage from './pages/EventDetailsPage';


function App() {

  return (
    <>
  <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
              <DashboardPage />
            </ProtectedRoute>
          }
        />
           <Route 
          path="/add-event" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AddEventPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )

}

export default App;