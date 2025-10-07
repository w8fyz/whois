import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">whois</Link>
      <div className="navbar-nav">
        {user ? (
          <>
            <div className="navbar-user">
              Logged in: {user.email}
            </div>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth">
            <button className="btn btn-primary">
              Login / Register
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

