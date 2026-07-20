import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RouterQueryWrapper } from '../utils/testProviders';

vi.mock('../../src/api/user/auth', () => ({
  getMe: vi.fn(),
  logout: vi.fn(),
}));

import { getMe, logout } from '../../src/api/user/auth';
import { useLogout } from '../../src/hooks/user/useLogout';
import { useMe } from '../../src/hooks/user/useMe';

describe('useMe', () => {
  it('charge l’utilisateur courant', async () => {
    vi.mocked(getMe).mockResolvedValue({ data: { id: 1, email: 'a@b.com' } } as never);
    const { result } = renderHook(() => useMe(), { wrapper: RouterQueryWrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.email).toBe('a@b.com');
  });
});

describe('useLogout', () => {
  it('déconnecte et redirige', async () => {
    vi.mocked(logout).mockResolvedValue({ data: {} } as never);
    const { result } = renderHook(() => useLogout(), { wrapper: RouterQueryWrapper });

    await result.current.mutateAsync();

    expect(logout).toHaveBeenCalled();
  });
});
