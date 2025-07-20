import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarshipList from './StarshipList.jsx';
import StarshipDetail from './StarshipDetail.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarshipList />} />
        <Route path="/starship/:id" element={<StarshipDetail />} />
      </Routes>
    </Router>
  );
}
