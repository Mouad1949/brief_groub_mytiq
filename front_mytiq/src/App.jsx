import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
          <h1>Contenu de la page</h1>
          <p>La navbar est maintenant pleine largeur avec le dégradé correct !</p>
      </div>
    </Router>
  );
}

export default App;