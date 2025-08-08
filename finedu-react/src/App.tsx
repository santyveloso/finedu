import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';

function Landing() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f5f6fa' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Bem-vindo ao Finedu!</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: 500, textAlign: 'center' }}>
        Aprenda sobre finanças pessoais de forma simples, gamificada e interativa.
      </p>
      <button
        style={{ fontSize: '1.5rem', padding: '1rem 2.5rem', borderRadius: 8, background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        onClick={() => navigate('/dashboard')}
      >
        Entrar no Dashboard
      </button>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const persisted = localStorage.getItem('theme');
    if (persisted) {
      const shouldDark = persisted === 'dark';
      setIsDarkMode(shouldDark);
      document.documentElement.classList.toggle('dark', shouldDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
