import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // If you have a Footer component
import About from './pages/About';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Projects from './pages/Projects';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {<Route path="/" element={<Home />} />}
          <Route path="/about" element={<About />} />
          {<Route path="/jobs" element={<Jobs />} />}
          {<Route path="/projects" element={<Projects />} />}
        </Routes>
      </main>
      {<Footer />}
    </Router>
  );
}

export default App;