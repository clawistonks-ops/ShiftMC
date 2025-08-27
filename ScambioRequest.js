import React, { useState } from "react";

export default function ScambioRequest({
  turni, scambi, onRequest, onUpdateSwap
}) {
  // Form proposta scambio
  const [turnoFrom, setTurnoFrom] = useState("");
  const [turnoTo, setTurnoTo] = useState("");
  const [motivo, setMotivo] = useState("");
  const [controProposta, setControProposta] = useState(false);
  const [orarioProposto, setOrarioProposto] = useState("");

  // Turni disponibili
  const mieiTurni = turnoFrom ? turni.filter(t => t.id === turnoFrom) : turni;
  const turniAltri = turni.filter(t => t.id !== turnoFrom);

  function handleScambio(e) {
    e.preventDefault();
    if (!turnoFrom || !turnoTo) return;
    onRequest({
      turnoDaCedere: turnoFrom,
      turnoDaPrendere: turnoTo,
      motivo,
      orarioProposto: controProposta ? orarioProposto : "",
      stato: "in attesa"
    });
    setTurnoFrom(""); setTurnoTo(""); setMotivo(""); setOrarioProposto(""); setControProposta(false);
  }

  // Scambi che ti riguardano
  const mieiScambi = scambi.filter(
    s => {
      const t = turni.find(tu => tu.id === s.turnoDaPrendere);
      return t && t.nome; // Rendi il filtro più intelligente se vuoi vedere chi è target, aggiungi un campo utente
    }
  );

  // Funzioni accetta/rifiuta controproposta lato dipendente
  function handleRisposta(id, stato) {
    onUpdateSwap(id, stato);
  }

  return (
    <div className="bg-gray-50 rounded shadow p-4 mb-4">
      <h3 className="font-bold mb-2">Proponi Scambio Turno</h3>
      <form className="mb-4 flex flex-col gap-2" onSubmit={handleScambio}>
        <select value={turnoFrom} onChange={e => setTurnoFrom(e.target.value)} 
                className="border rounded px-2 py-1">
          <option value="">Seleziona il tuo turno</option>
          {turni.map(t => (
            <option key={t.id} value={t.id}>
              {t.nome} - {t.giorno} - {t.fascia}
            </option>
          ))}
        </select>
        <select value={turnoTo} onChange={e => setTurnoTo(e.target.value)} 
                className="border rounded px-2 py-1">
          <option value="">Con chi vuoi scambiare?</option>
          {turniAltri.map(t => (
            <option key={t.id} value={t.id}>
              {t.nome} - {t.giorno} - {t.fascia}
            </option>
          ))}
        </select>
        <input value={motivo} onChange={e => setMotivo(e.target.value)}
            placeholder="Motivazione (opzionale)"
            className="border rounded px-2 py-1" type="text" />
        <label className="flex gap-2 items-center">
          <input type="checkbox" checked={controProposta} 
                 onChange={e => setControProposta(e.target.checked)} />
          Proponi orario diverso
        </label>
        {controProposta &&
          <input className="border rounded px-2 py-1"
                value={orarioProposto}
                onChange={e => setOrarioProposto(e.target.value)}
                placeholder="Nuovo orario (es. 11:00–15:00)" />}
        <button type="submit"
            className="self-start px-4 py-2 bg-green-600 text-white rounded">Invia proposta</button>
      </form>

      <h4 className="font-bold mb-2">Richieste ricevute</h4>
      <div className="space-y-2">
        {scambi.filter(s => s.stato === "in attesa").map((s, idx) => {
          const da = turni.find(t => t.id === s.turnoDaCedere);
          const a = turni.find(t => t.id === s.turnoDaPrendere);
          return (
            <div key={s.id || idx} className="bg-white rounded shadow p-2 flex flex-col gap-1">
              <div>
                <b>{da?.nome}</b> propone di scambiare <b>{da?.giorno} {da?.fascia}</b><br />
                con <b>{a?.nome}</b> - <b>{a?.giorno} {a?.fascia}</b>
              </div>
              {s.orarioProposto && (
                <div className="text-xs text-gray-600">Controproposta orario: <b>{s.orarioProposto}</b></div>
              )}
              {s.motivo && (
                <div className="text-xs text-gray-600">Motivazione: {s.motivo}</div>
              )}
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRisposta(s.id, "approvato da dipendente")}>
                  Accetta
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRisposta(s.id, "rifiutato")}>
                  Rifiuta
                </button>
              </div>
            </div>
          );
        })}
        {/* Se non ci sono richieste */}
        {scambi.filter(s => s.stato === "in attesa").length === 0 &&
          <div className="text-sm text-gray-500">Nessuna richiesta al momento.</div>
        }
      </div>
    </div>
  );
}
