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

// ─── Main Admin Panel ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '▦' },
  { key: 'products', label: 'Products', icon: '◈' },
  { key: 'orders', label: 'Orders', icon: '◉' },
  { key: 'customers', label: 'Customers', icon: '◎' },
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
        </main>
      </div>
    </div>
  )
}