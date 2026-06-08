const API_URL = "http://localhost:3000/api/v1/notes";

export const api = {
  getAll: () => fetch(API_URL).then((res) => res.json()),

  create: (note) =>
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }).then((res) => res.json()),

  update: (id, note) =>
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    }).then((res) => res.json()),

  delete: (id) =>
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json()),
};