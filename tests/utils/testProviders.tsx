import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { SettingsProvider } from '../../src/features/settings/SettingsProvider';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export const QueryWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>
);

export const RouterQueryWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

export const FullProvidersWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    <SettingsProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </SettingsProvider>
  </QueryClientProvider>
);

export const renderWithQueryClient = (ui: React.ReactElement) =>
  render(ui, { wrapper: QueryWrapper });

export const renderWithRouter = (ui: React.ReactElement) =>
  render(ui, { wrapper: RouterQueryWrapper });

export const renderWithFullProviders = (ui: React.ReactElement) =>
  render(ui, { wrapper: FullProvidersWrapper });
