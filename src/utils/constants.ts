export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Fuel Station'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'

export const DRAWER_WIDTH = 240

export const ROUTES = {
  DASHBOARD: '/',
  FUEL_TYPES: '/fuel-types',
  FUEL_PUMPS: '/fuel-pumps',
  FUELINGS: '/fuelings',
  REPORTS: '/reports',
} as const

export const NOTIFICATION_DURATION = 3000

export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]
