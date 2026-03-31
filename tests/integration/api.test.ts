import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios', () => {
  const mockInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  }
  return {
    default: {
      create: vi.fn(() => mockInstance),
    },
  }
})

describe('API client', () => {
  it('is a module', async () => {
    const { default: client } = await import('@/api/client')
    expect(client).toBeDefined()
  })
})
