import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const email = localStorage.getItem('user_email');
      if (email) {
        setUser({ email });
      }
    }
  }, []);

  const handleAuthSuccess = (response) => {
    if (response.user) {
      setUser(response.user);
      localStorage.setItem('user_email', response.user.email);
    }
    setShowAuth(false);
    setCurrentView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    setUser(null);
    setCurrentView('home');
  };

  const handleShowAuth = () => {
    setShowAuth(true);
    setCurrentView('auth');
  };

  return (
    <div className="App">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onShowAuth={handleShowAuth}
      />
      
      <div className="main-content">
        {currentView === 'auth' || showAuth ? (
          <Auth 
            onAuthSuccess={handleAuthSuccess}
            onCancel={() => {
              setShowAuth(false);
              setCurrentView('home');
            }}
          />
        ) : <Home />}
      </div>
    </div>
  );
}

export default App;
