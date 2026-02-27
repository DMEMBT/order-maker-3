import { useState, useEffect, useRef, useCallback } from 'react'
import Fuse from 'fuse.js'
import batteries from '../data/batteries.json'

const fuse = new Fuse(batteries, {
  keys: ['name'],
  threshold: 0.3,
  distance: 200,
  minMatchCharLength: 2,
  includeScore: true,
})

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const timerRef = useRef(null)

  const search = useCallback((q) => {
    setQuery(q)
    clearTimeout(timerRef.current)

    if (!q.trim() || q.trim().length < 1) {
      setResults([])
      return
    }

    timerRef.current = setTimeout(() => {
      // Direct includes match first (faster, exact)
      const uq = q.toUpperCase()
      const exact = batteries
        .filter((b) => b.name.toUpperCase().includes(uq))
        .slice(0, 15)

      if (exact.length >= 5) {
        setResults(exact)
      } else {
        // Fuse fuzzy fallback
        const fuzzy = fuse.search(q, { limit: 15 }).map((r) => r.item)
        // Merge, deduplicate
        const seen = new Set(exact.map((b) => b.id))
        const merged = [...exact, ...fuzzy.filter((b) => !seen.has(b.id))].slice(0, 15)
        setResults(merged)
      }
    }, 120)
  }, [])

  const clear = useCallback(() => {
    setQuery('')
    setResults([])
    clearTimeout(timerRef.current)
  }, [])

  return { query, results, search, clear }
}
