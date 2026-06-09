import { useState, useEffect } from "react";
import { api } from "./utils/api";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    api.getAll().then(setNotes).catch(console.error);
  }, []);

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        const updated = await api.update(editingNote._id, noteData);
        setNotes(notes.map((n) => (n._id === editingNote._id ? updated : n)));
        setEditingNote(null);
      } else {
        const newNote = await api.create(noteData);
        setNotes([newNote, ...notes]);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.delete(id);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>⚡ MERN Notes App</h1>
      </header>

      <main className="main-content">
        <NoteForm
          onSave={handleSaveNote}
          editingNote={editingNote}
          clearEdit={() => setEditingNote(null)}
        />

        <div className="notes-grid">
          {notes.length === 0 ? (
            <p className="no-notes">No notes found. Create one to get started!</p>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={setEditingNote}
                onDelete={handleDeleteNote}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;