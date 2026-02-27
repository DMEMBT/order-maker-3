import { useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag, FileSpreadsheet, Printer, X } from 'lucide-react'
import { downloadExcel, printInvoice } from '../utils/export'

function Toast({ message, visible }) {
  if (!visible) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                    bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold
                    shadow-lg animate-bounce">
      {message}
    </div>
  )
}

export default function CartSection({ cart, onRemove, onUpdateQty, onClear }) {
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [toast, setToast] = useState({ show: false, msg: '' })

  const showToast = (msg) => {
    setToast({ show: true, msg })
    setTimeout(() => setToast({ show: false, msg: '' }), 2500)
  }

  const totalQty = cart.reduce((s, i) => s + i.qty, 0)

  const handleExcel = () => {
    if (!cart.length) { showToast('Cart is empty!'); return }
    downloadExcel(cart, customer)
    showToast('Excel downloaded ✓')
  }

  const handlePrint = () => {
    if (!cart.length) { showToast('Cart is empty!'); return }
    printInvoice(cart, customer)
  }

  return (
    <section id="cart-section" className="mt-2">

      {/* Section heading */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center gap-2 font-bold text-slate-700 text-lg">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          Cart
        </div>
        {cart.length > 0 && (
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
            {cart.length} item{cart.length !== 1 ? 's' : ''}
          </span>
        )}
        {cart.length > 0 && (
          <button
            onClick={onClear}
            className="ml-auto text-xs text-red-500 hover:text-red-700 font-semibold
                       flex items-center gap-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear All
          </button>
        )}
      </div>

      {/* Empty state */}
      {cart.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm
                        py-16 text-center text-slate-400">
          <ShoppingBag className="w-14 h-14 mx-auto mb-3 opacity-20" />
          <p className="font-semibold text-base">Your cart is empty</p>
          <p className="text-sm mt-1">Search and add battery models above</p>
        </div>
      )}

      {/* Cart table */}
      {cart.length > 0 && (
        <>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-900 text-white text-left">
                    <th className="px-4 py-3 font-semibold text-xs w-10">#</th>
                    <th className="px-4 py-3 font-semibold text-xs w-24">Code</th>
                    <th className="px-4 py-3 font-semibold text-xs">Item Name</th>
                    <th className="px-4 py-3 font-semibold text-xs w-28 text-center">Qty</th>
                    <th className="px-4 py-3 font-semibold text-xs w-12 text-center">Del</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {cart.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>

                      {/* Sr. */}
                      <td className="px-4 py-3 text-slate-400 text-xs font-mono">
                        {idx + 1}
                      </td>

                      {/* Code */}
                      <td className="px-4 py-3">
                        <span className="font-bold text-blue-600 text-xs font-mono">
                          {item.id}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3 text-slate-700 text-xs leading-relaxed max-w-xs">
                        {item.name}
                      </td>

                      {/* Qty controls */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onUpdateQty(item.id, item.qty - 1)}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200
                                       flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3 text-slate-600" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => onUpdateQty(item.id, e.target.value)}
                            className="w-12 text-center text-sm font-bold border border-slate-200
                                       rounded-lg py-1 focus:outline-none focus:border-blue-400
                                       focus:ring-2 focus:ring-blue-100"
                          />
                          <button
                            onClick={() => onUpdateQty(item.id, item.qty + 1)}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200
                                       flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3 text-slate-600" />
                          </button>
                        </div>
                      </td>

                      {/* Delete */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center
                                     justify-center mx-auto transition-colors group"
                        >
                          <Trash2 className="w-4 h-4 text-slate-300 group-hover:text-red-500 transition-colors" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

                {/* Footer total row */}
                <tfoot>
                  <tr className="bg-blue-900 text-white">
                    <td colSpan={3} className="px-4 py-3 text-right text-xs font-bold tracking-wide">
                      TOTAL QUANTITY
                    </td>
                    <td className="px-4 py-3 text-center text-base font-extrabold">
                      {totalQty}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Customer details */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
            <h2 className="font-bold text-slate-800 text-base mb-4">
              Customer Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Customer Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm
                             focus:outline-none focus:border-blue-400 focus:ring-2
                             focus:ring-blue-100 transition-all placeholder-slate-300"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Mobile number"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm
                             focus:outline-none focus:border-blue-400 focus:ring-2
                             focus:ring-blue-100 transition-all placeholder-slate-300"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Shop / delivery address"
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm
                             focus:outline-none focus:border-blue-400 focus:ring-2
                             focus:ring-blue-100 transition-all placeholder-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExcel}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white
                         font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm
                         hover:shadow-md active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Download Excel
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white
                         font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm
                         hover:shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4" />
              Print / PDF
            </button>

            <button
              onClick={() => {
                if (window.confirm('Clear entire cart?')) onClear()
              }}
              className="flex items-center gap-2 bg-white hover:bg-red-50 text-red-500
                         border border-red-200 hover:border-red-400 font-bold text-sm
                         px-6 py-3 rounded-xl transition-all active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </>
      )}

      <Toast message={toast.msg} visible={toast.show} />
    </section>
  )
}
