export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export const API_VERSION = 'v1'
export const API_FULL_URL = `${API_BASE_URL}/api/${API_VERSION}`

export const ENDPOINTS = {
  FUEL_TYPES: '/fuel-types',
  FUEL_PUMPS: '/fuel-pumps',
  FUELINGS: '/fuelings',
} as const
