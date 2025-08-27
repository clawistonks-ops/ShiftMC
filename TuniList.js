import React from "react";

export default function TurniList({ turni, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {turni.map(turno => (
        <div key={turno.id} className="bg-white rounded shadow p-4">
          <div className="font-bold text-lg">{turno.nome}</div>
          <div className="text-sm italic mb-1">{turno.ruolo}</div>
          <div>{turno.giorno}</div>
          <div>{turno.fascia}</div>
          <button className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => onDelete(turno.id)}>Elimina</button>
        </div>
      ))}
    </div>
  );
}
