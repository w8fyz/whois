import React from 'react';

function Navbar({ user, onLogout, onShowAuth }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">whois</div>
      <div className="navbar-nav">
        {user ? (
          <>
            <div className="navbar-user">
              Logged in as: {user.email}
            </div>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={onShowAuth}>
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

