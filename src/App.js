import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchOption, setSearchOption] = useState('name');
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [selectedContactIndexes, setSelectedContactIndexes] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [contactCount, setContactCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const addContact = () => {
    if (newName && newNumber && newNumber.length === 10 && !isNaN(newNumber)) {
      setContacts([...contacts, { name: newName, number: newNumber }]);
      setNewName('');
      setNewNumber('');
      updateContactCount();
    } else {
      setAlertMessage('Please enter a valid 10-digit phone number.');
      setTimeout(() => {
        setAlertMessage('');
      }, 5000);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const searchContacts = () => {
    if (searchOption === 'name') {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(lowerCaseSearchValue)
      );
      setSearchedContacts(filteredContacts);
    } else if (searchOption === 'number') {
      const filteredContacts = contacts.filter(
        (contact) => contact.number.includes(searchValue)
      );
      setSearchedContacts(filteredContacts);
    }
  };

  const deleteSelectedContacts = () => {
    if (selectedContactIndexes.length > 0) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDeleteContacts = () => {
    const updatedContacts = contacts.filter(
      (contact, index) => !selectedContactIndexes.includes(index)
    );
    setContacts(updatedContacts);
    setSelectedContactIndexes([]);
    setShowDeleteConfirmation(false);
    updateContactCount();
  };

  const cancelDeleteContacts = () => {
    setSelectedContactIndexes([]);
    setShowDeleteConfirmation(false);
  };

  const updateContactCount = () => {
    setContactCount(contacts.length);
  };

  const showAllContacts = () => {
    updateContactCount();
    setShowNotification(true);
  };

  return (
    <div className="container">
      <h1 className="text-center glowing-text">Phone Book App</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter Number (10 digits)"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
            <button className="btn" onClick={addContact}>
              Add Contact
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Value"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <select
              className="form-select"
              onChange={handleSearchOptionChange}
              value={searchOption}
            >
              <option value="name">Search by Name (case-insensitive)</option>
              <option value="number">Search by Number</option>
            </select>
            <button className="btn" onClick={searchContacts}>
              Search
            </button>
          </div>
        </div>
      </div>
      {showNotification && (
        <div className="alert alert-success" role="alert">
          Number of Contacts: {contactCount}
        </div>
      )}
      {searchedContacts.length > 0 && (
        <div className="display_card">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Search Results</h5>
                <ul>
                  {searchedContacts.map((contact, index) => (
                    <li key={index}>
                      <p>Name: {contact.name}</p>
                      <p>Number: {contact.number}</p>
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          onChange={() => {
                            const updatedIndexes = selectedContactIndexes.includes(index)
                              ? selectedContactIndexes.filter((i) => i !== index)
                              : [...selectedContactIndexes, index];
                            setSelectedContactIndexes(updatedIndexes);
                          }}
                          className="form-check-input me-2"
                        />
                        Select
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="contact-list">
        <h2>Contact List</h2>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              <p>Name: {contact.name}</p>
              <p>Number: {contact.number}</p>
              <label className="form-check-label">
                <input
                  type="checkbox"
                  onChange={() => {
                    const updatedIndexes = selectedContactIndexes.includes(index)
                      ? selectedContactIndexes.filter((i) => i !== index)
                      : [...selectedContactIndexes, index];
                    setSelectedContactIndexes(updatedIndexes);
                  }}
                  className="form-check-input me-2"
                />
                Select
              </label>
            </li>
          ))}
        </ul>
        <button className="btn" onClick={deleteSelectedContacts}>
          Delete Selected Contacts
        </button>
        <button className="btn" onClick={showAllContacts}>
          Show All Contacts
        </button>
      </div>
      {showDeleteConfirmation && (
        <div className="alert alert-danger" role="alert">
          Are you sure you want to delete selected contacts?
          <button className="btn btn-danger" onClick={confirmDeleteContacts}>
            Yes
          </button>
          <button className="btn btn-secondary" onClick={cancelDeleteContacts}>
            No
          </button>
        </div>
      )}
      {alertMessage && (
        <div className="alert alert-danger" role="alert">
          {alertMessage}
        </div>
      )}
    </div>
  );
}

export default App;
