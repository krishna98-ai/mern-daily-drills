export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-actions">
        <button className="btn-edit" onClick={() => onEdit(note)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(note._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}