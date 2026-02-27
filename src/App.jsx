import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import SearchSection from './components/SearchSection'
import CartSection from './components/CartSection'

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mbt_cart') || '[]')
    } catch {
      return []
    }
  })

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mbt_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (battery) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === battery.id)
      if (existing) {
        return prev.map((i) =>
          i.id === battery.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { id: battery.id, name: battery.name, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQty = (id, qty) => {
    const q = Math.max(1, parseInt(qty) || 1)
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: q } : i)))
  }

  const clearCart = () => setCart([])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cart.length} />
      <main className="max-w-4xl mx-auto px-4 pb-16">
        <SearchSection onAdd={addToCart} />
        <CartSection
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onClear={clearCart}
        />
      </main>
    </div>
  )
}
