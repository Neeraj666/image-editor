import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import CanvasPage from './components/CanvasPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/canvas" element={<CanvasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
