import { describe, it, expect, vi } from 'vitest'
import { releaseDateToYear } from '@/utils/releaseDateToYear'

describe('releaseDateToYear', () => {
  it('parses YYYY-MM-DD to a numeric year', () => {
    expect(releaseDateToYear('2025-01-01')).toBe(2025)
  })
  it('handles single-year strings like YYYY', () => {
    expect(releaseDateToYear('2025')).toBe(2025)
  })
  it('handles malformed strings gracefully', () => {
    console.error = vi.fn()
    expect(releaseDateToYear('2025-01-01-01')).toBe(NaN)
    expect(console.error)
      .toHaveBeenCalledWith('Invalid release date: 2025-01-01-01')
  })
})


