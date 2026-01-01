import { describe, it, expect } from 'vitest'
import { paragraphText } from '@/utils/paragraphText'

describe('paragraphText', () => {
  it('formats a single sentence by capitalizing first word and normalizing others', () => {
    expect(paragraphText('hELLO wORLD')).toBe('HELLO wORLD.')
  })

  it('formats multiple sentences and preserves a single space between them', () => {
    expect(paragraphText('hello WORLD. second SENTENCE.')).toBe(
      'Hello wORLD. Second sENTENCE.',
    )
  })

  it('trims extra spaces and ignores empty segments', () => {
    expect(paragraphText('  first  SECOND.  THIRD   fOURTH  ')).toBe(
      'First sECOND. THIRD fOURTH.',
    )
  })

  it('returns empty string for empty or whitespace-only input', () => {
    expect(paragraphText('')).toBe('')
    expect(paragraphText('   ')).toBe('')
  })
})


