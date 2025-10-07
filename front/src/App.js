import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      const email = Cookies.get('user_email');
      if (email) {
        setUser({ email });
      }
    }
  }, []);

  const handleAuthSuccess = (response) => {
    if (response.user) {
      setUser(response.user);
      Cookies.set('user_email', response.user.email, { expires: 7, sameSite: 'strict' });
    }
  };

  const handleLogout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('user_email');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
