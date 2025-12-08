import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import AddEventPage from './pages/AddEventPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Dashboard shows events and tickets */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Page to add new event */}
          <Route path="/add-event" element={<AddEventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;