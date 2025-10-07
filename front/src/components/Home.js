import React, {useEffect, useState} from 'react';
import Contact from "./Contact";
import ContactModal from "./ContactModal";
import api from "../services/api";

function Home({ user }) {
    const [contacts, setContacts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (user) {
            loadContacts();
        }
    }, [user]);

    const loadContacts = async () => {
        try {
            const data = await api.getContacts();
            setContacts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddContact = () => {
        setSelectedContact(null);
        setShowModal(true);
    };

    const handleUpdateContact = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    const handleDeleteContact = async (contactId) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await api.deleteContact(contactId);
                loadContacts();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleSaveContact = async (formData) => {
        try {
            if (selectedContact) {
                await api.updateContact(selectedContact._id, formData);
            } else {
                await api.createContact(formData);
            }
            setShowModal(false);
            setSelectedContact(null);
            loadContacts();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancelModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    const filteredContacts = contacts.filter((contact) => {
        if (!searchQuery.trim()) return true;
        
        const query = searchQuery.toLowerCase();
        const firstName = (contact.firstName || '').toLowerCase();
        const lastName = (contact.lastName || '').toLowerCase();
        const email = (contact.email || '').toLowerCase();
        const phone = (contact.phone || '').toLowerCase();
        const company = (contact.company || '').toLowerCase();
        const notes = (contact.notes || '').toLowerCase();
        
        return firstName.includes(query) ||
               lastName.includes(query) ||
               email.includes(query) ||
               phone.includes(query) ||
               company.includes(query) ||
               notes.includes(query);
    });

  return (
    <div className="home-container">
      <h1 className="home-title">whois</h1>
      <h2 className="home-subtitle">A simpler way to remember.</h2>
      
      {user && (
        <>
          <input 
            className="search-input" 
            placeholder="Start by typing your query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="btn btn-primary add-contact-btn" 
            onClick={handleAddContact}
          >
            Add Contact
          </button>
        </>
      )}

      {error && (
        <div className="error-message" style={{ maxWidth: '600px', margin: '1rem auto' }}>
          {error}
        </div>
      )}

      {user ? (
        contacts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
            No contacts yet. Start by adding one!
          </div>
        ) : filteredContacts.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
            No contacts found matching "{searchQuery}".
          </div>
        ) : (
          <div className="contacts-grid">
            {filteredContacts.map((contact) => (
              <Contact 
                key={contact._id}
                contact={contact}
                onUpdate={handleUpdateContact}
                onDelete={handleDeleteContact}
              />
            ))}
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
          Please login to view and manage your contacts.
        </div>
      )}

      {showModal && (
        <ContactModal 
          contact={selectedContact}
          onSave={handleSaveContact}
          onCancel={handleCancelModal}
        />
      )}
    </div>
  );
}

export default Home;

