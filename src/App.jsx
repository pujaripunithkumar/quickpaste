import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Paste from './pages/Paste';
import NotFound from './pages/NotFound';


export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('quickpaste_theme') || 'light';
  });
  const [lastCreatedPaste, setLastCreatedPaste] = useState(null);


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('quickpaste_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNewPasteClick = () => {
    setLastCreatedPaste(null);
  };

  return (
    <div className="app-container">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onNewPasteClick={handleNewPasteClick} 
      />

      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                lastCreatedPaste={lastCreatedPaste} 
                setLastCreatedPaste={setLastCreatedPaste} 
              />
            } 
          />
          <Route path="/p/:id" element={<Paste />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div>
          &copy; 2026 QuickPaste &mdash; Share text and code, instantly.
        </div>
        <div>
          Anonymous &middot; No account required &middot; Open to all
        </div>
      </footer>
    </div>
  );
}
