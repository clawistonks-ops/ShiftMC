import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue, push, update, remove } from "firebase/database";
import TurnoForm from "./components/TurnoForm";
import TurniList from "./components/TurniList";
import ScambioRequest from "./components/ScambioRequest";
import AdminDashboard from "./components/AdminDashboard";
import "./index.css";

export default function App() {
  // Modalità login: "dipendente" o "admin"
  const [mode, setMode] = useState(null);

  // Turni e richieste, sincronizzati con Firebase
  const [turni, setTurni] = useState([]);
  const [scambi, setScambi] = useState([]);

  // Caricamento iniziale da Firebase
  useEffect(() => {
    onValue(ref(db, "turni"), snapshot => {
      const data = snapshot.val() || {};
      setTurni(Object.entries(data).map(([id, turno]) => ({ ...turno, id })));
    });

    onValue(ref(db, "scambi"), snapshot => {
      const data = snapshot.val() || {};
      setScambi(Object.entries(data).map(([id, scambio]) => ({ ...scambio, id })));
    });
  }, []);

  // Funzioni globali
  const addTurno = turno =>
    push(ref(db, "turni"), turno);

  const deleteTurno = id =>
    remove(ref(db, `turni/${id}`));

  const requestSwap = scambio =>
    push(ref(db, "scambi"), { ...scambio, stato: "in attesa" });

  const updateSwap = (id, stato) =>
    update(ref(db, `scambi/${id}`), { stato });

  const confirmSwap = (swap) => {
    // Effettua lo scambio dei turni
    const { turnoDaCedere, turnoDaPrendere } = swap;
    const swap1 = turni.find(t => t.id === turnoDaCedere);
    const swap2 = turni.find(t => t.id === turnoDaPrendere);
    if (swap1 && swap2) {
      // Inverti nome dei dipendenti
      update(ref(db, `turni/${swap1.id}`), { ...swap1, nome: swap2.nome });
      update(ref(db, `turni/${swap2.id}`), { ...swap2, nome: swap1.nome });
    }
    // Aggiorna stato scambio
    updateSwap(swap.id, "approvato");
  };

  // Semplice login
  if (!mode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <button className="w-full py-2 bg-blue-500 text-white rounded mb-2"
                  onClick={() => setMode("dipendente")}>Entra come Dipendente</button>
          <form onSubmit={e => {
            e.preventDefault();
            if (e.target.password.value === "admin123") setMode("admin");
            else alert("Password errata");
          }}>
            <input type="password" name="password" placeholder="Password Admin"
                   className="w-full border rounded py-2 px-2 mb-2" />
            <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded">
              Login Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Router base
  if (mode === "dipendente")
    return (
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Gestione Turni Dipendenti</h1>
        <TurnoForm onAdd={addTurno} />
        <TurniList turni={turni} onDelete={deleteTurno} />
        <ScambioRequest
          turni={turni}
          scambi={scambi}
          onRequest={requestSwap}
          onUpdateSwap={updateSwap}
        />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <AdminDashboard
        turni={turni}
        scambi={scambi}
        onUpdateSwap={updateSwap}
        confirmSwap={confirmSwap}
      />
    </div>
  );
}
