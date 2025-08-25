# ADVICE Time Tracker (MVP)
PWA embebible en WordPress para tareas + fogones + Eisenhower + tiempos. Persistencia central en Google Sheets vía Apps Script.

## Instalación
1. `cd pwa && npm ci && npm run dev` (desarrollo).
2. Producción: `npm run build` → subir `pwa/dist` y embeber en WP.
3. Apps Script: subir `/apps-script` (clasp o editor), setear `SPREADSHEET_ID` y publicar Web App.

## Config
- `VITE_API_BASE_URL` (URL del Web App de Apps Script).
- Página privada en WordPress con `<div id="advice-tracker" data-usuario="{email_o_id}"></div>`.

## Limitaciones
- Outbox IndexedDB en stub (sin `idb` todavía).
- Consolidado RRHH pendiente de implementación.
