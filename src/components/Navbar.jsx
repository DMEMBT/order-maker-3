import { ShoppingCart, Zap } from 'lucide-react'

export default function Navbar({ cartCount }) {
  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 rounded-xl p-2">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">MBT Battery</div>
            <div className="text-blue-300 text-xs">2,741 Models Available</div>
          </div>
        </div>

        {/* Cart badge */}
        <div className="flex items-center gap-2 bg-blue-800 border border-blue-700 px-4 py-2 rounded-xl">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold text-sm">Cart</span>
          {cartCount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </div>

      </div>
    </header>
  )
}
