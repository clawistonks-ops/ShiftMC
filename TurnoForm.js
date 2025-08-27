import React, { useState } from "react";

export default function TurnoForm({ onAdd }) {
  const [form, setForm] = useState({
    nome: "",
    ruolo: "front",
    giorno: "",
    fascia: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nome || !form.giorno || !form.fascia) return;
    onAdd(form);
    setForm({ nome: "", ruolo: "front", giorno: "", fascia: "" });
  }

  return (
    <form className="mb-4 bg-white rounded shadow p-4"
          onSubmit={handleSubmit}>
      <div className="flex gap-2 mb-2">
        <input name="nome" value={form.nome} onChange={handleChange}
               placeholder="Nome" className="border rounded px-2 py-1 flex-1" />
        <select name="ruolo" value={form.ruolo} onChange={handleChange}
                className="border rounded px-2 py-1">
          <option value="front">Front</option>
          <option value="cucina">Cucina</option>
          <option value="entrambi">Entrambi</option>
        </select>
      </div>
      <div className="flex gap-2 mb-2">
        <input name="giorno" type="date" value={form.giorno} onChange={handleChange}
               className="border rounded px-2 py-1 flex-1" />
        <input name="fascia" placeholder="Orario (es. 09:00-13:00)" value={form.fascia}
               onChange={handleChange} className="border rounded px-2 py-1 flex-1" />
      </div>
      <button type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded">Aggiungi turno</button>
    </form>
  );
}
