export async function sendLog(apiBaseUrl: string, payload: unknown) {
  const res = await fetch(`${apiBaseUrl}/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(`POST /log ${res.status}`);
  try { return await res.json(); } catch { return { ok: true }; }
}
