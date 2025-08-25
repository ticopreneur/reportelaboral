import 'fake-indexeddb/auto';
import { describe, it, expect, vi } from 'vitest';
import { queue, drain, type OutboxItem } from './outbox';

const sample: OutboxItem = { id: '1', url: '/log', body: { foo: 'bar' }, createdAt: 0 };

describe('outbox', () => {
  it('resends queued items after reconnecting', async () => {
    const fail = vi.fn().mockRejectedValue(new Error('offline'));
    await queue(sample);
    await drain(fail);
    expect(fail).toHaveBeenCalledOnce();

    const success = vi.fn().mockResolvedValue(undefined);
    await drain(success);
    expect(success).toHaveBeenCalledOnce();

    const noop = vi.fn();
    await drain(noop);
    expect(noop).not.toHaveBeenCalled();
  });
});
