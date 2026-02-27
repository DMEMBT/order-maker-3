import { useRef, useState, useEffect } from 'react'
import { Search, X, Plus, Battery } from 'lucide-react'
import { useSearch } from '../hooks/useSearch'

// Highlight matching text in result
function Highlight({ text, query }) {
  if (!query) return <span>{text}</span>
  const idx = text.toUpperCase().indexOf(query.toUpperCase())
  if (idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-yellow-200 text-yellow-900 rounded px-0.5 not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  )
}

const QUICK = ['BLP', 'BM', 'BN', 'VIVO', 'REDMI', 'SAMSUNG', 'NOKIA', 'SOLAR']

export default function SearchSection({ onAdd }) {
  const { query, results, search, clear } = useSearch()
  const [open, setOpen] = useState(false)
  const [added, setAdded] = useState(null)
  const inputRef = useRef(null)
  const wrapRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = (e) => {
    search(e.target.value)
    setOpen(true)
  }

  const handleClear = () => {
    clear()
    setOpen(false)
    inputRef.current?.focus()
  }

  const handleAdd = (battery) => {
    onAdd(battery)
    setAdded(battery.id)
    setTimeout(() => setAdded(null), 1200)
    clear()
    setOpen(false)
    inputRef.current?.focus()
    // Scroll to cart
    setTimeout(() => {
      document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const showDropdown = open && query.length >= 1

  return (
    <section className="py-10">
      {/* Hero text */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Battery className="w-3.5 h-3.5" />
          2,741 Battery Models — Instant Search
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
          Find Your Battery
        </h1>
        <p className="text-slate-500 text-base">
          Search by model code · brand · phone name
        </p>
      </div>

      {/* Search input */}
      <div ref={wrapRef} className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => query && setOpen(true)}
            placeholder="Type BLP885, BM58, REDMI NOTE, VIVO..."
            className="w-full pl-12 pr-12 py-4 text-base rounded-2xl border-2 border-slate-200
                       bg-white shadow-sm focus:outline-none focus:border-blue-500
                       focus:ring-4 focus:ring-blue-100 transition-all placeholder-slate-400"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* ── DROPDOWN ── */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl
                          border border-slate-100 z-50 overflow-hidden">

            {results.length === 0 ? (
              <div className="px-5 py-8 text-center text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No battery found for "<strong>{query}</strong>"</p>
              </div>
            ) : (
              <>
                <div className="max-h-80 overflow-y-auto scrollbar-thin divide-y divide-slate-50">
                  {results.map((battery) => (
                    <button
                      key={battery.id}
                      onClick={() => handleAdd(battery)}
                      className="w-full text-left px-5 py-3.5 hover:bg-blue-50 transition-colors
                                 flex items-center justify-between gap-3 group"
                    >
                      <div className="flex-1 min-w-0">
                        {/* Item code */}
                        <div className="text-xs font-bold text-blue-600 font-mono mb-0.5">
                          #{battery.id}
                        </div>
                        {/* Item name with highlight */}
                        <div className="text-sm text-slate-700 leading-snug line-clamp-2">
                          <Highlight text={battery.name} query={query} />
                        </div>
                      </div>

                      {/* Add button */}
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold
                                        shrink-0 transition-all
                                        ${added === battery.id
                                          ? 'bg-green-500 text-white'
                                          : 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
                                        }`}>
                        <Plus className="w-3.5 h-3.5" />
                        {added === battery.id ? 'Added!' : 'Add'}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="px-5 py-2.5 bg-slate-50 text-xs text-slate-400 border-t border-slate-100">
                  {results.length} result{results.length !== 1 ? 's' : ''} — click any item to add to cart
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Quick search chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-5 max-w-2xl mx-auto">
        {QUICK.map((q) => (
          <button
            key={q}
            onClick={() => { search(q); setOpen(true); inputRef.current?.focus() }}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200
                       bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600
                       hover:bg-blue-50 transition-all"
          >
            {q}
          </button>
        ))}
      </div>
    </section>
  )
}
