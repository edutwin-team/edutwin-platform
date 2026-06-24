import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../src/context/AuthProvider';
import { SettingsProvider } from '../../src/features/settings/SettingsProvider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <MemoryRouter>{ui}</MemoryRouter>
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
