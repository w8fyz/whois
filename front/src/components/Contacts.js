import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Contact from "./Contact";

function Contacts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2 className="contacts-title">My Contacts</h2>
        <button className="btn btn-primary">Add Contact</button>
      </div>
      

    </div>
  );
}

export default Contacts;

