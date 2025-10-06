import React from 'react';

function Contact({contact}) {
    return <div key={contact._id} className="contact-card">
        <h3 className="contact-name">
            {contact.firstName} {contact.lastName}
        </h3>
        {contact.email && (
            <div className="contact-info">Email: {contact.email}</div>
        )}
        {contact.phoneNumber && (
            <div className="contact-info">Phone: {contact.phoneNumber}</div>
        )}
        {contact.company && (
            <div className="contact-info">Company: {contact.company}</div>
        )}
        {contact.notes && (
            <div className="contact-info" style={{ marginTop: '0.5rem' }}>
                {contact.notes}
            </div>
        )}
    </div>
}

export default Contact;