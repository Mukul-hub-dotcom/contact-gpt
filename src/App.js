import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () => {
    axios.get('https://long-cyan-cheetah-coat.cyclic.app/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = event => {
    setPhone(event.target.value);
  };

  const handleAddContact = event => {
    event.preventDefault();
    axios.post('https://long-cyan-cheetah-coat.cyclic.app/contacts/add', { name, email, phone })
      .then(response => {
        console.log(response);
        getContacts();
        setName('');
        setEmail('');
        setPhone('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Contacts</h1>
      <form onSubmit={handleAddContact}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />
        <button type="submit">Add Contact</button>
      </form>
      <h2>All Contacts</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
