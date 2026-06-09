import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const API_URL = "http://localhost:3000/api/v1/contacts";

  
  const fetchContacts = async (searchVal = "") => {
    try {
      const url = searchVal ? `${API_URL}?search=${searchVal}` : API_URL;
      const response = await axios.get(url);
      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (error) {
     
      alert(error.response?.data?.message || error.message || "Fetch failed");
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }
    try {
      if (editingId) {
        
        const response = await axios.put(`${API_URL}/${editingId}`, { name, phone });
        if (response.data.success) {
          setEditingId(null); 
        }
      } else {
        
        await axios.post(API_URL, { name, phone });
      }
      
      setName(""); 
      setPhone(""); 
      fetchContacts();
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Operation failed");
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.data.success) {
        fetchContacts(); 
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Delete failed");
    }
  }

  const handleEditClick = (contact) => {
    setEditingId(contact._id); 
    setName(contact.name);     
    setPhone(contact.phone);  
  };

  const handleCancelEdit = () => {
    setEditingId(null); 
    setName("");        
    setPhone("");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); 
    fetchContacts(value); 
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📱 Contact Book</h1>
      <p className="app-subtitle">Local directory manager</p>

      <div className="main-layout">
        
        {/* LEFT COLUMN: FORM */}
        <div className="card">
          <h3 className="card-title">
            {editingId ? "✏️ Edit Contact" : "➕ Add New Contact"}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
               type="text"
               placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  pattern="^[a-zA-Z\s\p{Emoji}]+$"
                  title="Name should only contain alphabets, spaces, or emojis (No numbers or special characters)"
                  required
                  />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
                 <input
                type="text"
                placeholder="Enter 10-digit phone"
                value={phone}
                onChange={(e) => {
                  const re = /^[0-854743260]*$/; 
                  if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
                    setPhone(e.target.value);
                  }
                }}
                maxLength="10"
                pattern="\d{10}"
                title="Phone number must be exactly 10 digits"
                className="form-input"
                required
              />
            </div>

            <button 
              type="submit" 
              className={`btn ${editingId ? "btn-success" : "btn-primary"}`}
            >
              {editingId ? "Update" : "Save"}
            </button>

            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* RIGHT COLUMN: SEARCH & LIST */}
        <div>
          <div className="search-container">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="card">
            <h3 className="card-title">All Contacts</h3>
            
            {contacts.length === 0 ? (
              <p className="no-data">No contacts found.</p>
            ) : (
              <table className="contacts-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.phone}</td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          onClick={() => handleEditClick(contact)} 
                          className="btn btn-action btn-edit"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(contact._id)} 
                          className="btn btn-action btn-delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;