import React, { useState, useEffect } from 'react';

function ContactModal({ contact, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        notes: contact.notes || '',
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {contact ? 'Edit Contact' : 'Add Contact'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              name="firstName"
              className="form-input"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              name="lastName"
              className="form-input"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Company</label>
            <input
              type="text"
              name="company"
              className="form-input"
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              className="form-input form-textarea"
              placeholder="Enter notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              {contact ? 'Edit' : 'Add'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;

