import { describe, it, expect } from 'vitest'
import { formatCurrency, formatLiters, formatDate, formatNumber } from '@/utils/formatters'

describe('formatters', () => {
  it('formatCurrency formats BRL currency', () => {
    const result = formatCurrency(10.5)
    expect(result).toContain('10')
  })

  it('formatLiters appends L', () => {
    expect(formatLiters(50)).toBe('50.00 L')
  })

  it('formatNumber formats decimals', () => {
    expect(formatNumber(3.14159, 2)).toBe('3.14')
  })

  it('formatDate returns a date string', () => {
    const result = formatDate('2024-01-15')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})
