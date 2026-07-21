import { vi } from 'vitest';

export const apiMock = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  defaults: {
    headers: {
      common: {} as Record<string, string>,
    },
  },
};

vi.mock('../../src/api/axios', () => ({
  default: apiMock,
}));

export const resetApiMock = () => {
  apiMock.get.mockReset();
  apiMock.post.mockReset();
  apiMock.put.mockReset();
  apiMock.delete.mockReset();
  apiMock.defaults.headers.common = {};
};
