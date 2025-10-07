import React from 'react';
import {FaPen, FaTrash} from "react-icons/fa";

function Contact({ contact, onUpdate, onDelete }) {
  return (
    <div className="contact-card">
      <h3 className="contact-name">
        {contact.firstName} {contact.lastName}
      </h3>
      {contact.email && (
        <p className="contact-info">Email: {contact.email}</p>
      )}
      {contact.phone && (
        <p className="contact-info">Phone: {contact.phone}</p>
      )}
      {contact.company && (
        <p className="contact-info">Company: {contact.company}</p>
      )}
      {contact.notes && (
        <p className="contact-info">Notes: {contact.notes}</p>
      )}
      
      <div className="contact-actions">
        <button 
          className="btn btn-secondary btn-small" 
          onClick={() => onUpdate(contact)}
        >
            <FaPen />
        </button>
        <button 
          className="btn btn-danger btn-small" 
          onClick={() => onDelete(contact._id)}
        >
            <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default Contact;

