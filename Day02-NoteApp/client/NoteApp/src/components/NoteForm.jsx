import { useState, useEffect } from "react";

export default function NoteForm({ onSave, editingNote, clearEdit }) {
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (editingNote) {
      setNote({ title: editingNote.title, content: editingNote.content });
    } else {
      setNote({ title: "", content: "" });
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) return;
    onSave(note);
    setNote({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h3>{editingNote ? "Edit Note" : " Add New Note"}</h3>
      <input
        type="text"
        placeholder="Enter title..."
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <textarea
        placeholder="Write note content here..."
        rows="4"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {editingNote ? "Save Changes" : "Add Note"}
        </button>
        {editingNote && (
          <button type="button" className="btn-cancel" onClick={clearEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}