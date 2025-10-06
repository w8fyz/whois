import React, {useEffect, useState} from 'react';
import Contact from "./Contact";
import api from "../services/api";

function Home() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const data = await api.getContacts();
            setContacts(data);
        } catch (err) {
        } finally {
        }
    };

  return (
    <div className="home-container">
      <h1 className="home-title">whois</h1>
      <h2 className="home-subtitle">A simpler way to remember.</h2>
      <input 
        className="search-input" 
        placeholder="Start by typing your query"
      />
        {contacts.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                No contacts yet. Start by adding one!
            </div>
        ) : (
            <div className="contacts-grid">
                {contacts.map((contact) => (
                    <Contact contact={contact}/>
                ))}
            </div>
        )}
    </div>
  );
}

export default Home;

