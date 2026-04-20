import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = 'aradiyas18@gmail.com'
const PRIMARY = '#8B7355'
const BG = '#FDFBF7'

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: `${PRIMARY} transparent ${PRIMARY} ${PRIMARY}` }} />
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <div className="text-4xl mb-3">✦</div>
      <p className="text-sm">{message}</p>
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    paid: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-sky-100 text-sky-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status || 'pending'}
    </span>
  )
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }}>
      <div className={`bg-white rounded-[12px] shadow-xl flex flex-col max-h-[90vh] ${wide ? 'w-full max-w-2xl' : 'w-full max-w-lg'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20 }}>
            {title}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>
        <div className="overflow-y-auto px-6 py-4 flex-1">{children}</div>
      </div>
    </div>
  )
}

// ─── Dashboard Tab ─────────────────────────────────────────────────────────────
function DashboardTab() {
  const [stats, setStats] = useState({ products: 0, orders: 0, customers: 0, revenue: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [{ count: products }, { count: orders }, { count: customers }, { data: orderData }, { data: recent }] =
        await Promise.all([
          supabase.from('products').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('id', { count: 'exact', head: true }),
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('orders').select('total'),
          supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
        ])
      const revenue = (orderData || []).reduce((s, o) => s + parseFloat(o.total || 0), 0)
      setStats({ products: products || 0, orders: orders || 0, customers: customers || 0, revenue })
      setRecentOrders(recent || [])
      setLoading(false)
    }
    load()
  }, [])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const cards = [
    { label: 'Total Products', value: stats.products, icon: '◈' },
    { label: 'Total Orders', value: stats.orders, icon: '◉' },
    { label: 'Total Customers', value: stats.customers, icon: '◎' },
    { label: 'Total Revenue', value: fmt(stats.revenue), icon: '◆' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Dashboard</h2>
      {loading ? <Spinner /> : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((c) => (
              <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
                <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
                <div className="text-2xl font-semibold text-gray-800 mb-1">{c.value}</div>
                <div className="text-xs text-gray-500">{c.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-[12px] shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-700">Recent Orders</h3>
            </div>
            {recentOrders.length === 0 ? <EmptyState message="No orders yet" /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: BG }}>
                      {['Customer', 'Delivery', 'Total', 'Status', 'Date'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-gray-800">{o.shipping_address?.full_name || '—'}</td>
                        <td className="px-5 py-3 text-gray-600">{o.delivery_method || '—'}</td>
                        <td className="px-5 py-3 text-gray-800 font-medium">{fmt(o.total)}</td>
                        <td className="px-5 py-3"><StatusBadge status={o.payment_status} /></td>
                        <td className="px-5 py-3 text-gray-500">{fmtDate(o.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Products Tab ──────────────────────────────────────────────────────────────
function ProductModal({ product, onClose, onSaved }) {
  const isEdit = !!product?.id
  const [form, setForm] = useState({
    name: product?.name || '',
    brand: product?.brand || 'Shan Loray',
    price: product?.price || '',
    category: product?.category || 'Skincare',
    subcategory: product?.subcategory || '',
    image_url: product?.image_url || '',
    description: product?.description || '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, price: parseFloat(form.price) || 0 }
    let res
    if (isEdit) {
      res = await supabase.from('products').update(payload).eq('id', product.id)
    } else {
      res = await supabase.from('products').insert(payload)
    }
    setSaving(false)
    if (res.error) { setError(res.error.message); return }
    onSaved()
  }

  return (
    <Modal title={isEdit ? 'Edit Product' : 'Add Product'} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Product Name *</label>
            <input required value={form.name} onChange={(e) => set('name', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Brand *</label>
            <input required value={form.brand} onChange={(e) => set('brand', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Price (USD) *</label>
            <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => set('price', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
            <select required value={form.category} onChange={(e) => set('category', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 bg-white">
              {['Skincare', 'Makeup', 'Fragrance'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Subcategory</label>
          <input value={form.subcategory} onChange={(e) => set('subcategory', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
          <input value={form.image_url} onChange={(e) => set('image_url', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1" />
          {form.image_url && (
            <img src={form.image_url} alt="preview" className="mt-2 w-16 h-16 rounded-lg object-cover border border-gray-100" />
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
          <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 resize-none" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 text-white rounded-lg py-2 text-sm font-medium transition-opacity disabled:opacity-60"
            style={{ background: PRIMARY }}>
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

function ProductsTab() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState('')
  const PAGE_SIZE = 20

  const load = useCallback(async () => {
    setLoading(true)
    let q = supabase.from('products').select('*', { count: 'exact' })
    if (search) q = q.or(`name.ilike.%${search}%,brand.ilike.%${search}%`)
    if (category !== 'All') q = q.ilike('category', `%${category}%`)
    q = q.order('created_at', { ascending: false }).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1)
    const { data, count } = await q
    setProducts(data || [])
    setTotal(count || 0)
    setLoading(false)
  }, [search, category, page])

  useEffect(() => { load() }, [load])
  useEffect(() => { setPage(0) }, [search, category])

  async function deleteProduct() {
    await supabase.from('products').delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    showToast('Product deleted')
    load()
  }

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const fmt = (n) => `$${parseFloat(n).toFixed(2)}`
  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 text-white text-sm px-4 py-2 rounded-lg shadow-lg" style={{ background: PRIMARY }}>
          {toast}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Products</h2>
        <button onClick={() => setModal({ mode: 'add' })}
          className="text-white text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
          style={{ background: PRIMARY }}>
          + Add Product
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input placeholder="Search by name or brand…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white">
          {['All', 'Skincare', 'Makeup', 'Fragrance'].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-[12px] shadow-sm">
        {loading ? <Spinner /> : products.length === 0 ? <EmptyState message="No products found" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: BG }}>
                  {['Image', 'Name', 'Brand', 'Category', 'Price', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        : <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300">◈</div>
                      }
                    </td>
                    <td className="px-5 py-3 text-gray-800 font-medium max-w-[180px] truncate">{p.name}</td>
                    <td className="px-5 py-3 text-gray-600">{p.brand}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F0EBE3', color: PRIMARY }}>{p.category}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-800">{fmt(p.price)}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setModal({ mode: 'edit', product: p })}
                          className="text-xs px-3 py-1 rounded-md border transition-colors hover:bg-amber-50"
                          style={{ borderColor: PRIMARY, color: PRIMARY }}>
                          Edit
                        </button>
                        <button onClick={() => setDeleteTarget(p)}
                          className="text-xs px-3 py-1 rounded-md border border-red-200 text-red-500 transition-colors hover:bg-red-50">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">Page {page + 1} of {totalPages} — {total} products</span>
            <div className="flex gap-2">
              <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}
                className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors">
                ← Prev
              </button>
              <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}
                className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
      {modal && (
        <ProductModal
          product={modal.mode === 'edit' ? modal.product : null}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); showToast(modal.mode === 'edit' ? 'Product updated' : 'Product added'); load() }}
        />
      )}
      {deleteTarget && (
        <Modal title="Confirm Delete" onClose={() => setDeleteTarget(null)}>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)}
              className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={deleteProduct}
              className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── Orders Tab ────────────────────────────────────────────────────────────────
function OrderDetailModal({ order, onClose, onStatusChange }) {
  const [status, setStatus] = useState(order.status || 'pending')
  const [saving, setSaving] = useState(false)
  const fmt = (n) => `$${parseFloat(n || 0).toFixed(2)}`
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const addr = order.shipping_address || {}

  async function saveStatus() {
    setSaving(true)
    await supabase.from('orders').update({ status }).eq('id', order.id)
    setSaving(false)
    onStatusChange(order.id, status)
  }

  return (
    <Modal title={`Order #${order.id.slice(0, 8).toUpperCase()}`} onClose={onClose} wide>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={{ background: BG }}>
          <div>
            <p className="text-xs text-gray-500 mb-1">Customer</p>
            <p className="text-sm font-medium text-gray-800">{addr.full_name || '—'}</p>
            <p className="text-xs text-gray-500 mt-1">{addr.phone || ''}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Shipping Address</p>
            <p className="text-sm text-gray-700">{addr.street || '—'}</p>
            <p className="text-sm text-gray-700">{[addr.city, addr.state, addr.postal_code].filter(Boolean).join(', ')}</p>
            <p className="text-sm text-gray-700">{addr.country || ''}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Delivery Method</p>
            <p className="text-sm text-gray-700">{order.delivery_method || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Order Date</p>
            <p className="text-sm text-gray-700">{fmtDate(order.created_at)}</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Items ({order.items?.length || 0})</p>
          <div className="space-y-2">
            {(order.items || []).map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                {item.product_image
                  ? <img src={item.product_image} alt={item.product_name} className="w-10 h-10 rounded-lg object-cover" />
                  : <div className="w-10 h-10 rounded-lg bg-gray-100" />
                }
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.product_name || item.name || '—'}</p>
                  <p className="text-xs text-gray-500">{item.brand || ''} · Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-800">{fmt(item.price)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 space-y-1">
          <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>{fmt(order.subtotal)}</span></div>
          <div className="flex justify-between text-sm text-gray-600"><span>Shipping</span><span>{fmt(order.shipping)}</span></div>
          <div className="flex justify-between text-sm text-gray-600"><span>Tax</span><span>{fmt(order.tax)}</span></div>
          <div className="flex justify-between text-sm font-semibold text-gray-800 border-t border-gray-100 pt-2 mt-2">
            <span>Total</span><span>{fmt(order.total)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <div>
            <p className="text-xs text-gray-500 mb-1">Payment Status</p>
            <StatusBadge status={order.payment_status} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">Order Status</p>
            <div className="flex gap-2">
              <select value={status} onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm bg-white focus:outline-none flex-1">
                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <button onClick={saveStatus} disabled={saving}
                className="text-white text-sm px-3 py-1.5 rounded-lg disabled:opacity-60 transition-opacity"
                style={{ background: PRIMARY }}>
                {saving ? '…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

function OrdersTab() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [viewOrder, setViewOrder] = useState(null)
  const [toast, setToast] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function changeStatus(id, status) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
    showToast('Order status updated')
  }

  async function inlineStatus(id, status) {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o))
    showToast('Order status updated')
  }

  const fmt = (n) => `$${parseFloat(n || 0).toFixed(2)}`
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const filtered = orders.filter((o) => {
    const name = (o.shipping_address?.full_name || '').toLowerCase()
    const matchSearch = !search || name.includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 text-white text-sm px-4 py-2 rounded-lg shadow-lg" style={{ background: PRIMARY }}>
          {toast}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Orders</h2>
        <button onClick={load} className="text-sm border border-gray-200 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          ↺ Refresh
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input placeholder="Search by customer name…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white">
          {['All', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-[12px] shadow-sm">
        {loading ? <Spinner /> : filtered.length === 0 ? <EmptyState message="No orders found" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: BG }}>
                  {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Order Status', 'Date', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{o.id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-4 py-3 text-gray-800">{o.shipping_address?.full_name || '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{o.items?.length || 0}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{fmt(o.total)}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.payment_status} /></td>
                    <td className="px-4 py-3">
                      <select value={o.status || 'pending'} onChange={(e) => inlineStatus(o.id, e.target.value)}
                        className="border border-gray-200 rounded-md px-2 py-1 text-xs bg-white focus:outline-none">
                        {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{fmtDate(o.created_at)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setViewOrder(o)}
                        className="text-xs px-3 py-1 rounded-md border transition-colors hover:bg-amber-50"
                        style={{ borderColor: PRIMARY, color: PRIMARY }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {viewOrder && (
        <OrderDetailModal
          order={viewOrder}
          onClose={() => setViewOrder(null)}
          onStatusChange={(id, status) => {
            changeStatus(id, status)
            setViewOrder((o) => ({ ...o, status }))
          }}
        />
      )}
    </div>
  )
}

// ─── Customers Tab ─────────────────────────────────────────────────────────────
function CustomersTab() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    const { data: orders } = await supabase.from('orders').select('user_id, total')

    const ordersByUser = {}
    ;(orders || []).forEach((o) => {
      if (!ordersByUser[o.user_id]) ordersByUser[o.user_id] = { count: 0, spent: 0 }
      ordersByUser[o.user_id].count += 1
      ordersByUser[o.user_id].spent += parseFloat(o.total || 0)
    })

    const merged = (profiles || []).map((p) => ({
      ...p,
      orders: ordersByUser[p.user_id]?.count || 0,
      spent: ordersByUser[p.user_id]?.spent || 0,
    }))

    setCustomers(merged)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const fmt = (n) => `$${parseFloat(n).toFixed(2)}`
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase()
    return !search || (c.full_name || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q)
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Customers</h2>
        <button onClick={load} className="text-sm border border-gray-200 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
          ↺ Refresh
        </button>
      </div>
      <div className="mb-4">
        <input placeholder="Search by name or email…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
      </div>
      <div className="bg-white rounded-[12px] shadow-sm">
        {loading ? <Spinner /> : filtered.length === 0 ? <EmptyState message="No customers found" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: BG }}>
                  {['', 'Full Name', 'Email', 'Total Orders', 'Total Spent', 'Joined'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                        style={{ background: PRIMARY }}>
                        {(c.full_name || c.email || '?')[0].toUpperCase()}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-800 font-medium">{c.full_name || '—'}</td>
                    <td className="px-5 py-3 text-gray-600">{c.email || '—'}</td>
                    <td className="px-5 py-3 text-gray-700">{c.orders}</td>
                    <td className="px-5 py-3 text-gray-800 font-medium">{fmt(c.spent)}</td>
                    <td className="px-5 py-3 text-gray-500">{fmtDate(c.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Analytics Tab ─────────────────────────────────────────────────────────────
function AnalyticsTab() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

      const [{ data: allOrders }, { data: monthOrders }, { data: newCustomers }, { data: products }] = await Promise.all([
        supabase.from('orders').select('id, total, created_at, items'),
        supabase.from('orders').select('id').gte('created_at', monthStart),
        supabase.from('profiles').select('id').gte('created_at', monthStart),
        supabase.from('products').select('id, name, brand, category'),
      ])

      const orders = allOrders || []
      const totalRevenue = orders.reduce((s, o) => s + parseFloat(o.total || 0), 0)
      const avgOrder = orders.length ? totalRevenue / orders.length : 0

      const days = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now)
        d.setDate(d.getDate() - i)
        const label = d.toLocaleDateString('en-US', { weekday: 'short' })
        const dateStr = d.toISOString().slice(0, 10)
        const rev = orders
          .filter((o) => o.created_at?.slice(0, 10) === dateStr)
          .reduce((s, o) => s + parseFloat(o.total || 0), 0)
        days.push({ label, rev })
      }
      const maxRev = Math.max(...days.map((d) => d.rev), 1)

      const productCount = {}
      orders.forEach((o) => {
        ;(o.items || []).forEach((item) => {
          const pid = item.product_id
          if (!pid) return
          if (!productCount[pid]) productCount[pid] = { count: 0, name: item.product_name || item.name, brand: item.brand }
          productCount[pid].count += item.quantity || 1
        })
      })
      const topProducts = Object.entries(productCount)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5)
        .map(([pid, v]) => {
          const prod = (products || []).find((p) => p.id === pid)
          return { pid, ...v, category: prod?.category || '—' }
        })

      const catCount = { Skincare: 0, Makeup: 0, Fragrance: 0 }
      orders.forEach((o) => {
        ;(o.items || []).forEach((item) => {
          const prod = (products || []).find((p) => p.id === item.product_id)
          const cat = prod?.category || ''
          if (cat in catCount) catCount[cat] += item.quantity || 1
        })
      })
      const catTotal = Object.values(catCount).reduce((s, v) => s + v, 0) || 1

      setData({
        totalRevenue, avgOrder,
        ordersThisMonth: (monthOrders || []).length,
        newCustomers: (newCustomers || []).length,
        days, maxRev, topProducts, catCount, catTotal,
      })
      setLoading(false)
    }
    load()
  }, [])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  if (loading) return <Spinner />

  const { totalRevenue, avgOrder, ordersThisMonth, newCustomers, days, maxRev, topProducts, catCount, catTotal } = data

  const catColors = { Skincare: PRIMARY, Makeup: '#C9A870', Fragrance: '#688B8D' }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Analytics</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: fmt(totalRevenue), icon: '◆' },
          { label: 'Avg Order Value', value: fmt(avgOrder), icon: '◐' },
          { label: 'Orders This Month', value: ordersThisMonth, icon: '◉' },
          { label: 'New Customers (Month)', value: newCustomers, icon: '◎' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[12px] shadow-sm p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Revenue — Last 7 Days</h3>
        <div className="flex items-end gap-2 h-36">
          {days.map((d, i) => {
            const pct = maxRev > 0 ? (d.rev / maxRev) * 100 : 0
            const isMax = d.rev === maxRev && d.rev > 0
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                {isMax && <span className="text-xs font-medium" style={{ color: PRIMARY }}>{fmt(d.rev)}</span>}
                {!isMax && <span className="text-xs text-transparent select-none">—</span>}
                <div className="w-full rounded-t-md transition-all" style={{ height: `${Math.max(pct, 2)}%`, background: isMax ? PRIMARY : '#D4C4AE' }} />
                <span className="text-xs text-gray-500">{d.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[12px] shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Top Selling Products</h3>
          {topProducts.length === 0 ? <EmptyState message="No sales data yet" /> : (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.pid} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: i === 0 ? PRIMARY : '#C4B49A' }}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.name || '—'}</p>
                    <p className="text-xs text-gray-500">{p.brand} · {p.category}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{p.count}x</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-[12px] shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Sales by Category</h3>
          <div className="space-y-4">
            {Object.entries(catCount).map(([cat, count]) => {
              const pct = Math.round((count / catTotal) * 100)
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{cat}</span>
                    <span className="text-gray-500">{pct}% ({count} items)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: catColors[cat] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Reviews Tab ───────────────────────────────────────────────────────────────
function ReviewsTab() {
  const [reviews, setReviews] = useState([])
  const [products, setProducts] = useState({})
  const [profiles, setProfiles] = useState({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [ratingFilter, setRatingFilter] = useState('All')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const [{ data: revs }, { data: prods }, { data: profs }] = await Promise.all([
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('products').select('id, name, brand, category'),
      supabase.from('profiles').select('id, user_id, full_name'),
    ])
    const prodMap = {}
    ;(prods || []).forEach((p) => { prodMap[p.id] = p })
    const profMap = {}
    ;(profs || []).forEach((p) => { profMap[p.user_id] = p })
    setReviews(revs || [])
    setProducts(prodMap)
    setProfiles(profMap)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function deleteReview() {
    await supabase.from('reviews').delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    showToast('Review deleted')
    load()
  }

  const filtered = reviews.filter((r) => {
    const prod = products[r.product_id]
    const prof = profiles[r.user_id]
    const q = search.toLowerCase()
    const matchSearch = !search ||
      (prod?.name || '').toLowerCase().includes(q) ||
      (prof?.full_name || '').toLowerCase().includes(q)
    const matchRating = ratingFilter === 'All' || r.rating === parseInt(ratingFilter)
    return matchSearch && matchRating
  })

  const totalRevs = reviews.length
  const avgRating = totalRevs ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / totalRevs).toFixed(1) : '0.0'
  const fiveStars = reviews.filter((r) => r.rating === 5).length
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  function Stars({ rating }) {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className="text-sm" style={{ color: s <= rating ? '#C9A870' : '#D1D5DB' }}>★</span>
        ))}
      </div>
    )
  }

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 text-white text-sm px-4 py-2 rounded-lg shadow-lg" style={{ background: PRIMARY }}>
          {toast}
        </div>
      )}
      <h2 className="text-2xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Reviews</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Reviews', value: totalRevs, icon: '✦' },
          { label: 'Average Rating', value: `${avgRating} / 5`, icon: '★' },
          { label: '5-Star Reviews', value: fiveStars, icon: '◈' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input placeholder="Search by product or reviewer…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white">
          <option value="All">All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
        </select>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        {loading ? <Spinner /> : filtered.length === 0 ? <EmptyState message="No reviews found" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: BG }}>
                  {['Product', 'Reviewer', 'Rating', 'Title', 'Content', 'Date', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const prod = products[r.product_id] || {}
                  const prof = profiles[r.user_id] || {}
                  const initials = (prof.full_name || '?')[0].toUpperCase()
                  return (
                    <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-800 font-medium max-w-[140px] truncate">{prod.name || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                            style={{ background: PRIMARY }}>
                            {initials}
                          </div>
                          <span className="text-gray-700 text-xs">{prof.full_name || '—'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Stars rating={r.rating} /></td>
                      <td className="px-4 py-3 text-gray-700 max-w-[120px] truncate">{r.title || '—'}</td>
                      <td className="px-4 py-3 text-gray-500 max-w-[180px]">
                        <span title={r.content}>{(r.content || '').length > 80 ? r.content.slice(0, 80) + '…' : r.content || '—'}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{fmtDate(r.created_at)}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setDeleteTarget(r)}
                          className="text-xs px-3 py-1 rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteTarget && (
        <Modal title="Delete Review" onClose={() => setDeleteTarget(null)}>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete this review by <strong>{profiles[deleteTarget.user_id]?.full_name || 'unknown'}</strong>? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)}
              className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={deleteReview}
              className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── Discounts Tab ─────────────────────────────────────────────────────────────
function DiscountModal({ discount, onClose, onSaved }) {
  const isEdit = !!discount?.id
  const [form, setForm] = useState({
    code: discount?.code || '',
    type: discount?.type || 'percentage',
    value: discount?.value || '',
    minimum_order: discount?.minimum_order || '',
    max_uses: discount?.max_uses || '',
    expires_at: discount?.expires_at ? discount.expires_at.slice(0, 10) : '',
    is_active: discount?.is_active !== false,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      code: form.code.toUpperCase(),
      type: form.type,
      value: parseFloat(form.value) || 0,
      minimum_order: parseFloat(form.minimum_order) || 0,
      max_uses: form.max_uses !== '' ? parseInt(form.max_uses) : null,
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
      is_active: form.is_active,
    }
    let res
    if (isEdit) {
      res = await supabase.from('discount_codes').update(payload).eq('id', discount.id)
    } else {
      res = await supabase.from('discount_codes').insert(payload)
    }
    setSaving(false)
    if (res.error) { setError(res.error.message); return }
    onSaved()
  }

  return (
    <Modal title={isEdit ? 'Edit Discount Code' : 'Add Discount Code'} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Code *</label>
          <input required value={form.code} onChange={(e) => set('code', e.target.value.toUpperCase())}
            placeholder="e.g. SUMMER20"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none uppercase" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Type *</label>
            <select required value={form.type} onChange={(e) => set('type', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white">
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount ($)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Value *</label>
            <input required type="number" step="0.01" min="0" value={form.value} onChange={(e) => set('value', e.target.value)}
              placeholder={form.type === 'percentage' ? '10' : '25.00'}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Min Order ($)</label>
            <input type="number" step="0.01" min="0" value={form.minimum_order} onChange={(e) => set('minimum_order', e.target.value)}
              placeholder="0"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Max Uses</label>
            <input type="number" min="1" value={form.max_uses} onChange={(e) => set('max_uses', e.target.value)}
              placeholder="Unlimited"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Expiry Date</label>
          <input type="date" value={form.expires_at} onChange={(e) => set('expires_at', e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => set('is_active', !form.is_active)}
            className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0`}
            style={{ background: form.is_active ? PRIMARY : '#D1D5DB' }}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.is_active ? 'left-5' : 'left-1'}`} />
          </button>
          <span className="text-sm text-gray-600">Active</span>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex-1 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-60 transition-opacity"
            style={{ background: PRIMARY }}>
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Code'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

function DiscountsTab() {
  const [codes, setCodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('discount_codes').select('*').order('created_at', { ascending: false })
    setCodes(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function toggleActive(code) {
    await supabase.from('discount_codes').update({ is_active: !code.is_active }).eq('id', code.id)
    setCodes((prev) => prev.map((c) => c.id === code.id ? { ...c, is_active: !code.is_active } : c))
  }

  async function deleteCode() {
    await supabase.from('discount_codes').delete().eq('id', deleteTarget.id)
    setDeleteTarget(null)
    showToast('Code deleted')
    load()
  }

  function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => showToast(`Copied: ${code}`))
  }

  const activeCodes = codes.filter((c) => c.is_active).length
  const totalUses = codes.reduce((s, c) => s + (c.uses_count || 0), 0)
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 text-white text-sm px-4 py-2 rounded-lg shadow-lg" style={{ background: PRIMARY }}>
          {toast}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Discount Codes</h2>
        <button onClick={() => setModal({ mode: 'add' })}
          className="text-white text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
          style={{ background: PRIMARY }}>
          + Add Code
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Active Codes', value: activeCodes, icon: '◇' },
          { label: 'Total Uses', value: totalUses, icon: '◈' },
          { label: 'Total Codes', value: codes.length, icon: '◉' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        {loading ? <Spinner /> : codes.length === 0 ? <EmptyState message="No discount codes yet" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: BG }}>
                  {['Code', 'Type', 'Value', 'Min Order', 'Uses', 'Expires', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {codes.map((c) => (
                  <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-gray-800">{c.code}</span>
                        <button onClick={() => copyCode(c.code)} className="text-gray-400 hover:text-gray-600 text-xs" title="Copy">⧉</button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F0EBE3', color: PRIMARY }}>
                        {c.type === 'percentage' ? 'Percentage' : 'Fixed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {c.type === 'percentage' ? `${c.value}%` : `$${parseFloat(c.value).toFixed(2)}`}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.minimum_order > 0 ? `$${parseFloat(c.minimum_order).toFixed(2)}` : '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.uses_count} / {c.max_uses ?? '∞'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{fmtDate(c.expires_at)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                        {c.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setModal({ mode: 'edit', code: c })}
                          className="text-xs px-2 py-1 rounded-md border transition-colors hover:bg-amber-50"
                          style={{ borderColor: PRIMARY, color: PRIMARY }}>
                          Edit
                        </button>
                        <button onClick={() => toggleActive(c)}
                          className={`text-xs px-2 py-1 rounded-md border transition-colors ${c.is_active ? 'border-gray-200 text-gray-500 hover:bg-gray-50' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}>
                          {c.is_active ? 'Disable' : 'Enable'}
                        </button>
                        <button onClick={() => setDeleteTarget(c)}
                          className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                          Del
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <DiscountModal
          discount={modal.mode === 'edit' ? modal.code : null}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); showToast(modal.mode === 'edit' ? 'Code updated' : 'Code added'); load() }}
        />
      )}

      {deleteTarget && (
        <Modal title="Delete Code" onClose={() => setDeleteTarget(null)}>
          <p className="text-sm text-gray-600 mb-6">
            Delete discount code <strong className="font-mono">{deleteTarget.code}</strong>? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteTarget(null)}
              className="flex-1 border border-gray-200 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={deleteCode}
              className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── Inventory Tab ─────────────────────────────────────────────────────────────
function InventoryTab() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [stockFilter, setStockFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [stockEdits, setStockEdits] = useState({})
  const [savedIds, setSavedIds] = useState({})
  const [saving, setSaving] = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('id, name, brand, category, subcategory, image_url, stock').order('name')
    setProducts(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function saveStock(id) {
    const val = parseInt(stockEdits[id])
    if (isNaN(val) || val < 0) return
    setSaving((s) => ({ ...s, [id]: true }))
    await supabase.from('products').update({ stock: val }).eq('id', id)
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, stock: val } : p))
    setSaving((s) => ({ ...s, [id]: false }))
    setSavedIds((s) => ({ ...s, [id]: true }))
    setTimeout(() => setSavedIds((s) => { const n = { ...s }; delete n[id]; return n }), 2000)
    setStockEdits((s) => { const n = { ...s }; delete n[id]; return n })
  }

  const filtered = products.filter((p) => {
    const q = search.toLowerCase()
    const matchSearch = !search || (p.name || '').toLowerCase().includes(q)
    const stock = p.stock ?? 100
    const matchStock = stockFilter === 'All' ||
      (stockFilter === 'In Stock' && stock > 10) ||
      (stockFilter === 'Low Stock' && stock > 0 && stock <= 10) ||
      (stockFilter === 'Out of Stock' && stock === 0)
    const matchCat = categoryFilter === 'All' || (p.category || '').toLowerCase() === categoryFilter.toLowerCase()
    return matchSearch && matchStock && matchCat
  })

  const totalP = products.length
  const lowStock = products.filter((p) => (p.stock ?? 100) > 0 && (p.stock ?? 100) <= 10).length
  const outOfStock = products.filter((p) => (p.stock ?? 100) === 0).length

  function StockColor({ stock }) {
    const s = stock ?? 100
    if (s === 0) return <span className="font-semibold text-red-600">{s}</span>
    if (s <= 10) return <span className="font-semibold text-orange-500">{s}</span>
    return <span className="font-semibold text-emerald-600">{s}</span>
  }

  function StockBadge({ stock }) {
    const s = stock ?? 100
    if (s === 0) return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">Out of Stock</span>
    if (s <= 10) return <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium">Low Stock</span>
    return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">In Stock</span>
  }

  return (
    <div>
      <h2 className="text-2xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Inventory</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Products', value: totalP, icon: '◫' },
          { label: 'Low Stock', value: lowStock, icon: '◈' },
          { label: 'Out of Stock', value: outOfStock, icon: '◉' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input placeholder="Search by product name…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
        <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white">
          {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white">
          {['All', 'Skincare', 'Makeup', 'Fragrance'].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        {loading ? <Spinner /> : filtered.length === 0 ? <EmptyState message="No products found" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: BG }}>
                  {['Image', 'Product', 'Category', 'Stock', 'Status', 'Update Stock'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        : <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300">◈</div>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800 truncate max-w-[160px]">{p.name}</p>
                      {p.subcategory && <p className="text-xs text-gray-400">{p.subcategory}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F0EBE3', color: PRIMARY }}>{p.category}</span>
                    </td>
                    <td className="px-4 py-3"><StockColor stock={p.stock} /></td>
                    <td className="px-4 py-3"><StockBadge stock={p.stock} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number" min="0"
                          value={stockEdits[p.id] !== undefined ? stockEdits[p.id] : (p.stock ?? 100)}
                          onChange={(e) => setStockEdits((s) => ({ ...s, [p.id]: e.target.value }))}
                          className="w-20 border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none"
                        />
                        <button onClick={() => saveStock(p.id)} disabled={saving[p.id]}
                          className="text-xs px-3 py-1 rounded-md text-white disabled:opacity-60 transition-opacity"
                          style={{ background: PRIMARY }}>
                          {saving[p.id] ? '…' : 'Save'}
                        </button>
                        {savedIds[p.id] && <span className="text-xs text-emerald-600 font-medium">✓ Saved</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Skin Insights Tab ─────────────────────────────────────────────────────────
function SkinInsightsTab() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [{ data: analyses }, { data: profiles }] = await Promise.all([
        supabase.from('skin_analysis').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('id, user_id, full_name'),
      ])

      const rows = analyses || []
      const profMap = {}
      ;(profiles || []).forEach((p) => { profMap[p.user_id] = p })

      const avgScore = rows.length
        ? (rows.reduce((s, r) => s + (parseFloat(r.skin_score) || 0), 0) / rows.length).toFixed(1)
        : '0.0'

      function mostCommon(arr) {
        const count = {}
        arr.filter(Boolean).forEach((v) => { count[v] = (count[v] || 0) + 1 })
        return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
      }

      const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
      const concerns = ['Acne', 'Aging', 'Dryness', 'Oiliness', 'Sensitivity', 'Dark Spots']

      const typeCount = {}
      skinTypes.forEach((t) => { typeCount[t] = 0 })
      rows.forEach((r) => { if (r.selected_skin_type) typeCount[r.selected_skin_type] = (typeCount[r.selected_skin_type] || 0) + 1 })

      const concernCount = {}
      concerns.forEach((c) => { concernCount[c] = 0 })
      rows.forEach((r) => { if (r.selected_concern) concernCount[r.selected_concern] = (concernCount[r.selected_concern] || 0) + 1 })

      const specificCount = {}
      rows.forEach((r) => {
        ;(r.selected_specific_concerns || []).forEach((c) => {
          specificCount[c] = (specificCount[c] || 0) + 1
        })
      })
      const topSpecific = Object.entries(specificCount).sort((a, b) => b[1] - a[1]).slice(0, 6)

      const recent = rows.slice(0, 10).map((r) => ({ ...r, profile: profMap[r.user_id] }))

      setData({
        total: rows.length, avgScore,
        mostCommonType: mostCommon(rows.map((r) => r.selected_skin_type)),
        mostCommonConcern: mostCommon(rows.map((r) => r.selected_concern)),
        typeCount, concernCount, topSpecific, recent,
      })
      setLoading(false)
    }
    load()
  }, [])

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  if (loading) return <Spinner />
  if (!data) return <EmptyState message="No skin analysis data" />

  const { total, avgScore, mostCommonType, mostCommonConcern, typeCount, concernCount, topSpecific, recent } = data
  const maxType = Math.max(...Object.values(typeCount), 1)
  const maxConcern = Math.max(...Object.values(concernCount), 1)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Skin Analysis Insights</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Analyses', value: total, icon: '◉' },
          { label: 'Avg Skin Score', value: avgScore, icon: '◈' },
          { label: 'Common Skin Type', value: mostCommonType, icon: '◎' },
          { label: 'Common Concern', value: mostCommonConcern, icon: '◆' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-xl font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[12px] shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Skin Types Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(typeCount).map(([type, count]) => (
              <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{type}</span>
                  <span className="text-gray-500">{count} ({total > 0 ? Math.round((count / total) * 100) : 0}%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(count / maxType) * 100}%`, background: PRIMARY }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[12px] shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Skin Concerns Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(concernCount).map(([concern, count]) => (
              <div key={concern}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{concern}</span>
                  <span className="text-gray-500">{count} ({total > 0 ? Math.round((count / total) * 100) : 0}%)</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(count / maxConcern) * 100}%`, background: '#C9A870' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {topSpecific.length > 0 && (
        <div className="bg-white rounded-[12px] shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Top Specific Concerns</h3>
          <div className="flex flex-wrap gap-2">
            {topSpecific.map(([concern, count]) => (
              <span key={concern} className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ background: '#F0EBE3', color: PRIMARY }}>
                {concern} <span className="ml-1 opacity-70">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Recent Analyses</h3>
        </div>
        {recent.length === 0 ? <EmptyState message="No analyses yet" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: BG }}>
                  {['User', 'Score', 'Label', 'Skin Type', 'Concern', 'Date'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                          style={{ background: PRIMARY }}>
                          {(r.profile?.full_name || '?')[0].toUpperCase()}
                        </div>
                        <span className="text-xs text-gray-700">{r.profile?.full_name || '—'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold text-gray-800">{r.skin_score ?? '—'}</td>
                    <td className="px-5 py-3 text-gray-600">{r.skin_label || '—'}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F0EBE3', color: PRIMARY }}>
                        {r.selected_skin_type || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{r.selected_concern || '—'}</td>
                    <td className="px-5 py-3 text-gray-500">{fmtDate(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Financial Reports Tab ─────────────────────────────────────────────────────
function FinancialTab() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

      const [{ data: orders }, { data: profiles }] = await Promise.all([
        supabase.from('orders').select('id, user_id, total, tax, shipping, subtotal, payment_status, delivery_method, shipping_address, created_at').order('created_at', { ascending: false }),
        supabase.from('profiles').select('id, user_id, full_name'),
      ])

      const allOrders = orders || []
      const profMap = {}
      ;(profiles || []).forEach((p) => { profMap[p.user_id] = p })

      const totalRevenue = allOrders.reduce((s, o) => s + parseFloat(o.total || 0), 0)
      const totalTax = allOrders.reduce((s, o) => s + parseFloat(o.tax || 0), 0)
      const monthRevenue = allOrders.filter((o) => o.created_at >= monthStart).reduce((s, o) => s + parseFloat(o.total || 0), 0)
      const weekRevenue = allOrders.filter((o) => o.created_at >= weekStart).reduce((s, o) => s + parseFloat(o.total || 0), 0)

      const monthly = {}
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        monthly[key] = { label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), orders: 0, revenue: 0, tax: 0 }
      }
      allOrders.forEach((o) => {
        const key = o.created_at?.slice(0, 7)
        if (monthly[key]) {
          monthly[key].orders += 1
          monthly[key].revenue += parseFloat(o.total || 0)
          monthly[key].tax += parseFloat(o.tax || 0)
        }
      })
      const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

      const paymentBreakdown = {}
      allOrders.forEach((o) => {
        const s = o.payment_status || 'unknown'
        paymentBreakdown[s] = (paymentBreakdown[s] || 0) + 1
      })

      const deliveryBreakdown = {}
      allOrders.forEach((o) => {
        const d = o.delivery_method || 'unknown'
        deliveryBreakdown[d] = (deliveryBreakdown[d] || 0) + 1
      })

      const customerSpend = {}
      allOrders.forEach((o) => {
        if (!customerSpend[o.user_id]) customerSpend[o.user_id] = { count: 0, total: 0 }
        customerSpend[o.user_id].count += 1
        customerSpend[o.user_id].total += parseFloat(o.total || 0)
      })
      const topCustomers = Object.entries(customerSpend)
        .sort((a, b) => b[1].total - a[1].total)
        .slice(0, 5)
        .map(([uid, v]) => ({ ...v, name: profMap[uid]?.full_name || 'Unknown' }))

      setData({
        totalRevenue, totalTax, monthRevenue, weekRevenue,
        monthly, currentMonthKey,
        paymentBreakdown, deliveryBreakdown, topCustomers,
        allOrders, profMap,
      })
      setLoading(false)
    }
    load()
  }, [])

  const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  function exportCSV() {
    if (!data) return
    const rows = [['ID', 'Customer', 'Total', 'Tax', 'Shipping', 'Payment Status', 'Date']]
    data.allOrders.forEach((o) => {
      rows.push([
        o.id,
        o.shipping_address?.full_name || data.profMap[o.user_id]?.full_name || '—',
        parseFloat(o.total || 0).toFixed(2),
        parseFloat(o.tax || 0).toFixed(2),
        parseFloat(o.shipping || 0).toFixed(2),
        o.payment_status || '—',
        new Date(o.created_at).toLocaleDateString('en-US'),
      ])
    })
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `shan-loray-orders-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <Spinner />
  if (!data) return <EmptyState message="No financial data" />

  const { totalRevenue, totalTax, monthRevenue, weekRevenue, monthly, currentMonthKey, paymentBreakdown, deliveryBreakdown, topCustomers, allOrders } = data
  const maxDelivery = Math.max(...Object.values(deliveryBreakdown), 1)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Financial Reports</h2>
        <button onClick={exportCSV}
          className="text-white text-sm px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
          style={{ background: PRIMARY }}>
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: fmt(totalRevenue), icon: '◆' },
          { label: 'Revenue This Month', value: fmt(monthRevenue), icon: '◉' },
          { label: 'Revenue This Week', value: fmt(weekRevenue), icon: '◈' },
          { label: 'Total Tax Collected', value: fmt(totalTax), icon: '◎' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-xl font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Monthly Revenue — Last 6 Months</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: BG }}>
                {['Month', 'Orders', 'Revenue', 'Tax', 'Avg Order Value'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthly).map(([key, m]) => {
                const isCurrent = key === currentMonthKey
                const avg = m.orders ? m.revenue / m.orders : 0
                return (
                  <tr key={key} className={`border-t border-gray-50 transition-colors ${isCurrent ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                    <td className="px-5 py-3 font-medium" style={{ color: isCurrent ? PRIMARY : '#374151' }}>
                      {m.label} {isCurrent && <span className="text-xs ml-1 opacity-60">(current)</span>}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{m.orders}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{fmt(m.revenue)}</td>
                    <td className="px-5 py-3 text-gray-600">{fmt(m.tax)}</td>
                    <td className="px-5 py-3 text-gray-600">{fmt(avg)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-[12px] shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Payment Status Breakdown</h3>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(paymentBreakdown).map(([status, count]) => {
              const pct = allOrders.length ? Math.round((count / allOrders.length) * 100) : 0
              return (
                <div key={status} className="flex items-center justify-between p-3 rounded-lg" style={{ background: BG }}>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={status} />
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-800">{count}</span>
                    <span className="text-xs text-gray-400 ml-1">({pct}%)</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-[12px] shadow-sm p-5">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Delivery Method Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(deliveryBreakdown).map(([method, count]) => {
              const pct = allOrders.length ? Math.round((count / allOrders.length) * 100) : 0
              return (
                <div key={method}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 truncate max-w-[150px]">{method}</span>
                    <span className="text-gray-500 flex-shrink-0 ml-2">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(count / maxDelivery) * 100}%`, background: '#C9A870' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Top Revenue Customers</h3>
        {topCustomers.length === 0 ? <EmptyState message="No customer data yet" /> : (
          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: i === 0 ? '#FEF9F0' : BG }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                  style={{ background: i === 0 ? '#C9A870' : PRIMARY }}>
                  {(c.name || '?')[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                    {i === 0 && <span className="text-base" title="Top customer">♛</span>}
                  </div>
                  <p className="text-xs text-gray-500">{c.count} order{c.count !== 1 ? 's' : ''}</p>
                </div>
                <span className="text-sm font-semibold" style={{ color: PRIMARY }}>{fmt(c.total)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Shared Mockup Helpers ─────────────────────────────────────────────────────
function ComingSoonBanner({ text }) {
  return (
    <div className="rounded-[12px] p-4 mb-6 flex items-center gap-3" style={{ background: '#C9A870' }}>
      <span className="text-white text-lg">◈</span>
      <p className="text-white text-sm font-medium">{text}</p>
    </div>
  )
}

function MockToggle({ on }) {
  return (
    <div className="w-10 h-6 rounded-full flex-shrink-0 relative cursor-not-allowed" style={{ background: on ? '#C9A870' : '#D1D5DB' }}>
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-5' : 'left-1'}`} />
    </div>
  )
}

// ─── Notifications Tab (Mockup) ────────────────────────────────────────────────
function NotificationsTab() {
  const campaigns = [
    { name: 'Welcome New Customers', status: 'Sent', recipients: 342, date: 'Apr 15, 2026', openRate: '72%' },
    { name: 'Spring Collection Launch', status: 'Sent', recipients: 891, date: 'Apr 10, 2026', openRate: '65%' },
    { name: 'Skin Analysis Reminder', status: 'Scheduled', recipients: 156, date: 'Apr 25, 2026', openRate: '—' },
    { name: 'Exclusive Members Offer', status: 'Draft', recipients: null, date: '—', openRate: '—' },
  ]

  const reminders = [
    { email: 'aradiyas18@gmail.com', scheduled: 'Scheduled for Apr 25, 2026' },
    { email: 'melika123@gmail.com', scheduled: 'Scheduled for May 1, 2026' },
    { email: 'address123@gmail.com', scheduled: 'Scheduled for May 10, 2026' },
  ]

  const notifSettings = [
    { label: 'New Order Received', desc: 'Get notified when a new order is placed' },
    { label: 'Low Stock Alert', desc: 'Alert when product stock falls below 10 units' },
    { label: 'New Customer Signup', desc: 'Notify when a new customer registers' },
    { label: 'New Review Submitted', desc: 'Alert when a customer submits a product review' },
  ]

  const statusBadge = (s) => {
    if (s === 'Sent') return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Sent</span>
    if (s === 'Scheduled') return <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Scheduled</span>
    return <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">Draft</span>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Email & Notifications</h2>
      <ComingSoonBanner text="This feature is currently under development and will be available soon." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Emails Sent This Month', value: '1,248', icon: '◎' },
          { label: 'Open Rate', value: '68%', icon: '◈' },
          { label: 'Scheduled Reminders', value: '23', icon: '◉' },
          { label: 'Failed Deliveries', value: '3', icon: '◆' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Email Campaigns</h3>
          <button disabled title="Coming Soon"
            className="text-white text-sm px-4 py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
            style={{ background: PRIMARY }}>
            + Create Campaign
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: BG }}>
                {['Campaign', 'Status', 'Recipients', 'Date', 'Open Rate'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{c.name}</td>
                  <td className="px-5 py-3">{statusBadge(c.status)}</td>
                  <td className="px-5 py-3 text-gray-600">{c.recipients ?? '—'}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{c.date}</td>
                  <td className="px-5 py-3 text-gray-700">{c.openRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Skin Analysis Reminders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: BG }}>
                {['Email', 'Scheduled', 'Status'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reminders.map((r, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">{r.email}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{r.scheduled}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Pending</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm p-5">
        <h3 className="font-medium text-gray-700 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {notifSettings.map((n) => (
            <div key={n.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{n.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
              </div>
              <MockToggle on={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Staff Tab (Mockup) ────────────────────────────────────────────────────────
function StaffTab() {
  const staff = [
    { initial: 'A', email: 'aradiyas18@gmail.com', role: 'Super Admin', status: 'Active', lastLogin: 'Today' },
    { initial: 'M', email: 'manager@shanloray.com', role: 'Manager', status: 'Invited', lastLogin: 'Never' },
    { initial: 'S', email: 'staff@shanloray.com', role: 'Staff', status: 'Invited', lastLogin: 'Never' },
  ]

  const permissions = [
    { label: 'View Dashboard', staff: true, manager: true, admin: true },
    { label: 'Manage Products', staff: false, manager: true, admin: true },
    { label: 'Manage Orders', staff: true, manager: true, admin: true },
    { label: 'View Customers', staff: false, manager: true, admin: true },
    { label: 'Manage Discounts', staff: false, manager: true, admin: true },
    { label: 'Financial Reports', staff: false, manager: false, admin: true },
    { label: 'Staff Management', staff: false, manager: false, admin: true },
    { label: 'Content Management', staff: false, manager: true, admin: true },
  ]

  const activity = [
    { time: 'Today 09:15', user: 'aradiyas18@gmail.com', action: 'Logged into admin panel', color: '#22C55E' },
    { time: 'Today 09:20', user: 'aradiyas18@gmail.com', action: 'Updated order #A1B2C3D4 status to Shipped', color: '#3B82F6' },
    { time: 'Today 09:35', user: 'aradiyas18@gmail.com', action: 'Added new product "Rose Elixir Serum"', color: '#C9A870' },
    { time: 'Yesterday 14:22', user: 'aradiyas18@gmail.com', action: 'Deleted review #FF10BF64', color: '#EF4444' },
    { time: 'Yesterday 11:05', user: 'aradiyas18@gmail.com', action: 'Updated product price for "Velvet Kiss Lipstick"', color: '#3B82F6' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Staff Management</h2>
      <ComingSoonBanner text="Staff management with role-based permissions is currently under development." />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Staff Members', value: '3', icon: '◈' },
          { label: 'Active Sessions', value: '1', icon: '◉' },
          { label: 'Pending Invitations', value: '2', icon: '◎' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Team Members</h3>
          <button disabled
            className="text-white text-sm px-4 py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
            style={{ background: PRIMARY }}>
            + Invite Staff
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: BG }}>
                {['', 'Email', 'Role', 'Status', 'Last Login', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((s, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ background: PRIMARY }}>
                      {s.initial}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-700">{s.email}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#F0EBE3', color: PRIMARY }}>
                      {s.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {s.status === 'Active'
                      ? <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Active</span>
                      : <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Invited</span>
                    }
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{s.lastLogin}</td>
                  <td className="px-5 py-3">
                    <button disabled className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-400 cursor-not-allowed opacity-60">
                      {s.status === 'Active' ? 'Edit' : 'Resend Invite'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Role Permissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: BG }}>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Permission</th>
                {['Staff', 'Manager', 'Super Admin'].map((r) => (
                  <th key={r} className="text-center px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((p, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-700">{p.label}</td>
                  <td className="px-5 py-3 text-center">
                    <span style={{ color: p.staff ? '#C9A870' : '#D1D5DB' }} className="font-bold">{p.staff ? '✓' : '✗'}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span style={{ color: p.manager ? '#C9A870' : '#D1D5DB' }} className="font-bold">{p.manager ? '✓' : '✗'}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span style={{ color: p.admin ? '#C9A870' : '#D1D5DB' }} className="font-bold">{p.admin ? '✓' : '✗'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm p-5">
        <h3 className="font-medium text-gray-700 mb-4">Recent Activity Log</h3>
        <div className="space-y-3">
          {activity.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">{a.action}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.time} · {a.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Content Tab (Mockup) ──────────────────────────────────────────────────────
function ContentTab() {
  const banners = [
    { title: 'Spring Collection 2026', status: 'Active', position: 'Hero Banner' },
    { title: 'AI Skin Analysis Launch', status: 'Active', position: 'Featured Section' },
    { title: 'Ramadan Special Offer', status: 'Inactive', position: 'Promotional Bar' },
  ]

  const featured = [
    { name: 'Luminous Youth Elixir', category: 'Skincare' },
    { name: 'Velvet Kiss Lipstick', category: 'Makeup' },
    { name: 'Rose Oud Parfum', category: 'Fragrance' },
    { name: 'Supreme Radiance Cream', category: 'Skincare' },
  ]

  const posts = [
    { title: 'The Science Behind Retinol', status: 'Published', date: 'Apr 10, 2026', views: '1,240' },
    { title: 'Your Complete Spring Skincare Guide', status: 'Published', date: 'Apr 5, 2026', views: '892' },
    { title: 'Understanding Your Skin Type', status: 'Draft', date: '—', views: '—' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Content Management</h2>
      <ComingSoonBanner text="Content management tools are currently under development and will be available soon." />

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Homepage Banners</h3>
          <button disabled
            className="text-white text-sm px-4 py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
            style={{ background: PRIMARY }}>
            + Add Banner
          </button>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {banners.map((b, i) => (
            <div key={i} className="border border-gray-100 rounded-[10px] overflow-hidden">
              <div className="h-[200px] bg-gray-100 flex items-center justify-center" style={{ background: '#F3F0EC' }}>
                <span className="text-gray-300 text-4xl">◈</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-gray-800">{b.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${b.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {b.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{b.position}</p>
                <button disabled
                  className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-400 cursor-not-allowed opacity-60">
                  Edit Banner
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Featured Products on Homepage</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {featured.map((p, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
              <span className="text-gray-300 text-lg cursor-not-allowed select-none">≡</span>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">{p.name}</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: '#F0EBE3', color: PRIMARY }}>
                {p.category}
              </span>
              <button disabled
                className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-400 cursor-not-allowed opacity-60">
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 italic">Drag to reorder featured products — Coming Soon</p>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Journal Posts</h3>
          <button disabled
            className="text-white text-sm px-4 py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
            style={{ background: PRIMARY }}>
            + New Post
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: BG }}>
                {['Title', 'Status', 'Date', 'Views', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((p, i) => (
                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{p.title}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{p.date}</td>
                  <td className="px-5 py-3 text-gray-600">{p.views}</td>
                  <td className="px-5 py-3">
                    <button disabled className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-400 cursor-not-allowed opacity-60">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm p-5">
        <h3 className="font-medium text-gray-700 mb-4">Announcement Bar</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Announcement Text</label>
            <input
              disabled
              defaultValue="Free shipping on orders over $150 | New Spring Collection Now Available"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-gray-50 cursor-not-allowed"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MockToggle on={true} />
              <span className="text-sm text-gray-600">Show announcement bar</span>
            </div>
          </div>
          <button disabled
            className="text-white text-sm px-5 py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
            style={{ background: PRIMARY }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Security Tab (Mockup) ─────────────────────────────────────────────────────
function SecurityTab() {
  const loginHistory = [
    { ok: true, email: 'aradiyas18@gmail.com', time: 'Today 09:15 AM', browser: 'Chrome, Windows', location: 'Dubai, UAE' },
    { ok: true, email: 'aradiyas18@gmail.com', time: 'Apr 19, 2026 08:44 AM', browser: 'Chrome, Windows', location: 'Dubai, UAE' },
    { ok: true, email: 'aradiyas18@gmail.com', time: 'Apr 18, 2026 11:20 AM', browser: 'Safari, iPhone', location: 'Dubai, UAE' },
    { ok: false, email: 'unknown@gmail.com', time: 'Apr 17, 2026 03:12 AM', browser: 'Unknown Browser', location: 'Unknown Location' },
    { ok: true, email: 'aradiyas18@gmail.com', time: 'Apr 16, 2026 09:05 AM', browser: 'Chrome, Windows', location: 'Dubai, UAE' },
  ]

  const securitySettings = [
    { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', on: false },
    { label: 'Login Notifications', desc: 'Get notified on every new login', on: true },
    { label: 'Suspicious Activity Alerts', desc: 'Alert on unusual login attempts', on: true },
    { label: 'Auto Logout After Inactivity', desc: 'Logout after 30 minutes of inactivity', on: false },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#2D2D2D' }}>Access & Security</h2>
      <ComingSoonBanner text="Advanced security features are currently under development." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Admin Accounts', value: '1 Active', icon: '◈' },
          { label: 'Last Login', value: 'Today, 09:15 AM', icon: '◉' },
          { label: 'Failed Login Attempts', value: '0', icon: '◎' },
          { label: 'Two-Factor Auth', value: 'Not Enabled', icon: '◆' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-[12px] shadow-sm p-5">
            <div className="text-xl mb-2" style={{ color: PRIMARY }}>{c.icon}</div>
            <div className="text-lg font-semibold text-gray-800 mb-1">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[12px] shadow-sm p-5">
        <h3 className="font-medium text-gray-700 mb-4">Authorized Admin Emails</h3>
        <div className="flex gap-3 mb-4">
          <input disabled placeholder="Enter email address…"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 cursor-not-allowed" />
          <button disabled
            className="text-white text-sm px-4 py-2 rounded-lg font-medium opacity-60 cursor-not-allowed"
            style={{ background: PRIMARY }}>
            Add Admin
          </button>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: BG }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
            style={{ background: PRIMARY }}>
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800">aradiyas18@gmail.com</p>
            <p className="text-xs text-gray-400">Super Admin · Added: Apr 14, 2026</p>
          </div>
          <button disabled
            className="text-xs px-3 py-1 rounded-md border border-gray-200 text-gray-300 cursor-not-allowed opacity-50">
            Remove
          </button>
        </div>
        <p className="text-xs text-gray-400 italic mt-3">Only Super Admins can add or remove admin accounts</p>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-700">Recent Login History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: BG }}>
                {['', 'Email', 'Time', 'Browser', 'Location'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((l, i) => (
                <tr key={i} className={`border-t border-gray-50 transition-colors ${!l.ok ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                  <td className="px-5 py-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.ok ? '#22C55E' : '#EF4444' }} />
                  </td>
                  <td className="px-5 py-3 text-gray-700">{l.email}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">{l.time}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{l.browser}</td>
                  <td className="px-5 py-3 text-gray-600 text-xs">{l.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm p-5">
        <h3 className="font-medium text-gray-700 mb-4">Security Settings</h3>
        <div className="space-y-4">
          {securitySettings.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
              </div>
              <MockToggle on={s.on} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Admin Panel ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '▦' },
  { key: 'products', label: 'Products', icon: '◈' },
  { key: 'orders', label: 'Orders', icon: '◉' },
  { key: 'customers', label: 'Customers', icon: '◎' },
  { key: 'analytics', label: 'Analytics', icon: '◐' },
  { key: 'reviews', label: 'Reviews', icon: '✦' },
  { key: 'discounts', label: 'Discounts', icon: '◇' },
  { key: 'inventory', label: 'Inventory', icon: '◫' },
  { key: 'skininsights', label: 'Skin Insights', icon: '◉' },
  { key: 'financial', label: 'Financial', icon: '◆' },
  { key: 'notifications', label: 'Notifications', icon: '◎' },
  { key: 'staff', label: 'Staff', icon: '◈' },
  { key: 'content', label: 'Content', icon: '▣' },
  { key: 'security', label: 'Security', icon: '⊙' },
]

export default function AdminPanel() {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState('login')
  const [tab, setTab] = useState('dashboard')
  const [mobileNav, setMobileNav] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [checking, setChecking] = useState(false)

  const handleAdminLogin = async () => {
    if (!emailInput.trim()) return
    setChecking(true)
    setEmailError(false)
    if (emailInput.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setAuthState('admin')
    } else {
      setEmailError(true)
    }
    setChecking(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdminLogin()
  }

  function logout() {
    setAuthState('login')
    setEmailInput('')
    setEmailError(false)
  }

  // ── Login Page ──
  if (authState === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: BG, fontFamily: 'Inter, sans-serif' }}>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <div className="bg-white rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.10)] w-full max-w-[420px] overflow-hidden">
          {/* Gold accent top bar */}
          <div className="h-[4px]" style={{ background: `linear-gradient(to right, ${PRIMARY}, #C9A870)` }} />
          <div className="px-8 py-10">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-[28px] font-semibold tracking-[3px] mb-1"
                style={{ fontFamily: 'Cormorant Garamond, serif', color: PRIMARY }}>
                SHAN LORAY
              </h1>
              <p className="text-[13px] font-light italic text-gray-400">Admin Portal</p>
              <div className="w-12 h-[2px] mx-auto mt-3" style={{ background: '#C9A870' }} />
            </div>

            {/* Error Message */}
            {emailError && (
              <div className="mb-5 bg-red-50 border border-red-100 rounded-[10px] p-4 text-center">
                <p className="text-[14px] font-semibold text-red-600 mb-1">⚠ Incorrect Email Address</p>
                <p className="text-[12px] text-red-400 leading-relaxed mb-4">
                  The email you entered does not have admin access. Please provide the correct admin email to continue.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="text-[13px] font-medium px-5 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
                  style={{ background: PRIMARY }}>
                  Visit Our Website
                </button>
              </div>
            )}

            {/* Email Input */}
            {!emailError && (
              <p className="text-[13px] text-gray-500 text-center mb-5 leading-relaxed">
                Enter your admin email address to access the Shan Loray management portal.
              </p>
            )}

            <div className="mb-4">
              <label className="block text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                Admin Email Address
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value); setEmailError(false) }}
                onKeyDown={handleKeyDown}
                placeholder="Enter your admin email"
                className="w-full h-[48px] px-4 border rounded-[10px] text-[14px] text-gray-800 outline-none transition-colors"
                style={{ borderColor: emailError ? '#FCA5A5' : '#E5E7EB' }}
                autoFocus
              />
            </div>

            <button
              onClick={handleAdminLogin}
              disabled={checking || !emailInput.trim()}
              className="w-full h-[48px] text-white text-[14px] font-medium rounded-[10px] transition-opacity disabled:opacity-50 hover:opacity-90 mb-4"
              style={{ background: PRIMARY }}>
              {checking ? 'Verifying…' : 'Access Admin Panel →'}
            </button>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors">
                ← Back to Shan Loray Website
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Admin Panel ──
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG, fontFamily: 'Inter, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm z-20 sticky top-0">
        <div className="flex items-center justify-between px-4 sm:px-6 h-14">
          <div className="flex items-center gap-3">
            <button className="sm:hidden text-gray-500 hover:text-gray-700" onClick={() => setMobileNav(!mobileNav)}>☰</button>
            <span className="font-semibold tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif', color: PRIMARY, fontSize: 20 }}>
              Shan Loray <span className="text-gray-400 font-light text-base">Admin</span>
            </span>
          </div>
          <button onClick={logout}
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-50">
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="hidden sm:flex flex-col w-56 bg-white border-r border-gray-100 pt-6 pb-4 flex-shrink-0">
          <nav className="flex flex-col gap-1 px-3">
            {NAV_ITEMS.map((item) => (
              <button key={item.key} onClick={() => setTab(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full
                  ${tab === item.key ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                style={tab === item.key ? { background: PRIMARY } : {}}>
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Nav Drawer */}
        {mobileNav && (
          <div className="fixed inset-0 z-30 sm:hidden" onClick={() => setMobileNav(false)}
            style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="w-56 h-full bg-white shadow-xl pt-6" onClick={(e) => e.stopPropagation()}>
              <nav className="flex flex-col gap-1 px-3">
                {NAV_ITEMS.map((item) => (
                  <button key={item.key} onClick={() => { setTab(item.key); setMobileNav(false) }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full
                      ${tab === item.key ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={tab === item.key ? { background: PRIMARY } : {}}>
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8">
          {tab === 'dashboard' && <DashboardTab />}
          {tab === 'products' && <ProductsTab />}
          {tab === 'orders' && <OrdersTab />}
          {tab === 'customers' && <CustomersTab />}
          {tab === 'analytics' && <AnalyticsTab />}
          {tab === 'reviews' && <ReviewsTab />}
          {tab === 'discounts' && <DiscountsTab />}
          {tab === 'inventory' && <InventoryTab />}
          {tab === 'skininsights' && <SkinInsightsTab />}
          {tab === 'financial' && <FinancialTab />}
          {tab === 'notifications' && <NotificationsTab />}
          {tab === 'staff' && <StaffTab />}
          {tab === 'content' && <ContentTab />}
          {tab === 'security' && <SecurityTab />}
        </main>
      </div>
    </div>
  )
}