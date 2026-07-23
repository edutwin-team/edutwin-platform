import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useAuth } from '../../src/context/useAuth';
import { useSettings } from '../../src/features/settings/useSettings';
import { AuthContext } from '../../src/context/AuthContext';
import { SettingsProvider } from '../../src/features/settings/SettingsProvider';
import { QueryWrapper } from '../utils/testProviders';

describe('useAuth', () => {
  it('retourne le contexte auth', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={{ user: { id: 1 } as never, isLoading: false }}>
        {children}
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user?.id).toBe(1);
  });

  it('lève une erreur hors provider', () => {
    expect(() => renderHook(() => useAuth())).toThrow('useAuth must be used inside AuthProvider');
  });
});

describe('useSettings', () => {
  it('expose les actions du provider', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryWrapper>
        <SettingsProvider>{children}</SettingsProvider>
      </QueryWrapper>
    );

    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    await waitFor(() => {
      expect(result.current.settings.theme).toBe('dark');
    });

    act(() => {
      result.current.resetSettings();
    });

    await waitFor(() => {
      expect(result.current.settings.theme).toBe('light');
    });
  });
});
