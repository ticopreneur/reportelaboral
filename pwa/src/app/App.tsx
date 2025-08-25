import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Eisenhower, Fogon, LogPayload } from './contracts';
import { sendLog } from './api';
import { queue, drain } from './outbox';

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '__SET_ME__';

export function App({ usuarioWP }: { usuarioWP: string }) {
  const [titulo, setTitulo] = useState('');
  const [fogon, setFogon] = useState<Fogon>('principal');
  const [eisen, setEisen] = useState<Eisenhower>('UI');
  const [status, setStatus] = useState<string>('');

  const tareaId = useMemo(() => Math.random().toString(36).slice(2), []);

  async function log(accion: LogPayload['accion']) {
    const payload: LogPayload = {
      usuario_wp: usuarioWP,
      tarea_id: tareaId,
      titulo,
      fogon,
      eisenhower: eisen,
      accion,
      timestamp_iso: dayjs().toISOString()
    };
    try {
      if (!navigator.onLine) throw new Error('offline');
      await sendLog(API_BASE, payload);
      setStatus('Guardado');
    } catch {
      await queue({ id: crypto.randomUUID(), url: `${API_BASE}/log`, body: payload, createdAt: Date.now() });
      setStatus('Pendiente (offline)');
    }
  }

  window.addEventListener('online', () => drain(async (it) => {
    await fetch(it.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(it.body) });
  }));

  return (
    <div style={{ fontFamily: 'system-ui', padding: 12 }}>
      <h1>ADVICE Time Tracker</h1>
      <div>
        <input placeholder="Título de la tarea" value={titulo} onChange={(e)=>setTitulo(e.target.value)} />
        <select value={fogon} onChange={(e)=>setFogon(e.target.value as Fogon)}>
          <option value="principal">Fogón principal</option>
          <option value="secundario">Fogón secundario</option>
          <option value="miscelaneos">Misceláneos</option>
        </select>
        <select value={eisen} onChange={(e)=>setEisen(e.target.value as Eisenhower)}>
          <option value="UI">Urgente/Importante</option>
          <option value="NI">No Urgente/Importante</option>
          <option value="UU">Urgente/No Importante</option>
          <option value="NU">No Urgente/No Importante</option>
        </select>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={()=>log('start')}>Start</button>
        <button onClick={()=>log('pause')}>Pause</button>
        <button onClick={()=>log('stop')}>Stop</button>
        <button onClick={()=>log('save')}>Guardar</button>
      </div>
      <p style={{ color:'#0a0' }}>{status}</p>
      <hr />
      <p>Tablero (placeholder): 3 fogones × 4 cuadrantes.</p>
    </div>
  );
}
