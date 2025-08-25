export type OutboxItem = { id: string; url: string; body: any; createdAt: number };
const mem: OutboxItem[] = [];

export async function queue(item: OutboxItem) { mem.push(item); }
export async function drain(sender: (it: OutboxItem) => Promise<void>) {
  for (const it of [...mem]) {
    try { await sender(it); const i = mem.findIndex(x => x.id === it.id); if (i >= 0) mem.splice(i,1); }
    catch { /* keep for retry */ }
  }
}
