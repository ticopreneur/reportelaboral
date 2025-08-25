import { openDB, type DBSchema } from 'idb';

export type OutboxItem = { id: string; url: string; body: any; createdAt: number };

interface OutboxDB extends DBSchema {
  items: {
    key: string;
    value: OutboxItem;
  };
}

const dbPromise = openDB<OutboxDB>('outbox', 1, {
  upgrade(db) {
    db.createObjectStore('items', { keyPath: 'id' });
  },
});

export async function queue(item: OutboxItem) {
  const db = await dbPromise;
  await db.put('items', item);
}

export async function drain(sender: (it: OutboxItem) => Promise<void>) {
  const db = await dbPromise;
  const tx = db.transaction('items', 'readwrite');
  let cursor = await tx.store.openCursor();
  while (cursor) {
    try {
      await sender(cursor.value);
      await cursor.delete();
    } catch {
      /* keep for retry */
    }
    cursor = await cursor.continue();
  }
  await tx.done;
}
