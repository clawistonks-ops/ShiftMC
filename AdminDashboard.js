import React from "react";

export default function AdminDashboard({
  turni, scambi, onUpdateSwap, confirmSwap
}) {
  // Richieste da approvare (già approvate dal dipendente)
  const pendingAdmin = scambi.filter(s => s.stato === "approvato da dipendente");
  // Scambi confermati
  const confirmed = scambi.filter(s => s.stato === "approvato");

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>
      
      <h3 className="text-lg font-semibold mb-2">Richieste da confermare</h3>
      <div className="space-y-3 mb-6">
        {pendingAdmin.length === 0 &&
          <div className="text-gray-500">Nessuna richiesta da confermare.</div>
        }
        {pendingAdmin.map(s => {
          const da = turni.find(t => t.id === s.turnoDaCedere);
          const a = turni.find(t => t.id === s.turnoDaPrendere);
          return (
            <div key={s.id} className="bg-gray-50 rounded p-2 flex flex-col gap-1">
              <div><b>{da?.nome}</b> ↔️ <b>{a?.nome}</b></div>
              <div>{da?.giorno} {da?.fascia} ⇆ {a?.giorno} {a?.fascia}</div>
              {s.orarioProposto && (
                <div className="text-xs text-gray-600">Controproposta orario: <b>{s.orarioProposto}</b></div>
              )}
              {s.motivo && (
                <div className="text-xs text-gray-600">Motivazione: {s.motivo}</div>
              )}
              <div className="flex gap-2 mt-1">
                <button className="bg-green-600 text-white px-2 py-1 rounded"
                        onClick={() => confirmSwap(s)}>
                  Conferma scambio
                </button>
                <button className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => onUpdateSwap(s.id, "rifiutato")}>
                  Rifiuta
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="text-lg font-semibold mb-2">Scambi confermati</h3>
      <div className="space-y-2">
        {confirmed.length === 0 &&
          <div className="text-gray-500">Nessun scambio ancora confermato.</div>
        }
        {confirmed.map(s => {
          const da = turni.find(t => t.id === s.turnoDaCedere);
          const a = turni.find(t => t.id === s.turnoDaPrendere);
          return (
            <div key={s.id} className="bg-blue-50 rounded p-3">
              <div><b>{da?.nome}</b> ⇆ <b>{a?.nome}</b></div>
              <div>{da?.giorno} {da?.fascia} ⇆ {a?.giorno} {a?.fascia}</div>
              {s.orarioProposto && (
                <div className="text-xs text-gray-600">Controproposta orario: <b>{s.orarioProposto}</b></div>
              )}
              {s.motivo && (
                <div className="text-xs text-gray-600">Motivazione: {s.motivo}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
