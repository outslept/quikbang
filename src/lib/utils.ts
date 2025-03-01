import type { BangCommand } from '../../lib/fetch-bang'

export function loadRecentBangs(): BangCommand[] {
  try {
    const saved = localStorage.getItem('recentBangs')
    if (saved) {
      return JSON.parse(saved)
    }
  }
  catch (err) {
    console.error('Error loading recent bangs:', err)
  }
  return []
}

export function saveRecentBangs(bangs: BangCommand[]): void {
  try {
    localStorage.setItem('recentBangs', JSON.stringify(bangs))
  }
  catch (err) {
    console.error('Error saving recent bangs:', err)
  }
}

export function extractSearchTerm(query: string): string {
  const bangMatch = query.match(/^!\w+\s+(.*)$/)
  if (bangMatch) {
    return bangMatch[1]
  }
  else if (!query.startsWith('!')) {
    return query
  }
  return ''
}
