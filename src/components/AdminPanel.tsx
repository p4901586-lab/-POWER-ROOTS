import { useState, useEffect } from "react"
import { reviews as initialReviews } from "../data/content"

interface Review {
  name: string
  text: string
  status: 'approved' | 'pending' | 'rejected'
  id: string
}

interface Order {
  name: string
  phone: string
  date: string
}

export default function AdminPanel() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("reviews")
    if (stored) {
      setReviews(JSON.parse(stored))
    } else {
      const initial = initialReviews.map(r => ({ ...r, status: 'approved' as const, id: Math.random().toString(36) }))
      setReviews(initial)
      localStorage.setItem("reviews", JSON.stringify(initial))
    }

    const storedOrders = localStorage.getItem("orders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  const updateReviewStatus = (id: string, status: 'approved' | 'pending' | 'rejected') => {
    const updated = reviews.map(r => r.id === id ? { ...r, status } : r)
    setReviews(updated)
    localStorage.setItem("reviews", JSON.stringify(updated))
  }

  const deleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id)
    setReviews(updated)
    localStorage.setItem("reviews", JSON.stringify(updated))
  }

  const filteredReviews = reviews.filter(r => filter === 'all' || r.status === filter)

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">Адмін панель - Управління відгуками</h1>
      
      <div className="mb-6">
        <label className="text-neutral-300 mr-4">Фільтр:</label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value as any)}
          className="bg-black/50 border border-yellow-400/20 rounded px-3 py-2 text-white"
        >
          <option value="all">Всі</option>
          <option value="pending">Очікують</option>
          <option value="approved">Підтверджені</option>
          <option value="rejected">Відхилені</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredReviews.map(r => (
          <div key={r.id} className="rounded-2xl border border-yellow-400/15 bg-black/55 p-6">
            <p className="text-neutral-200 leading-relaxed mb-4">"{r.text}"</p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-300 font-semibold">{r.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  r.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                  r.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {r.status === 'approved' ? 'Підтверджено' : r.status === 'pending' ? 'Очікує' : 'Відхилено'}
                </span>
                <button 
                  onClick={() => updateReviewStatus(r.id, 'approved')}
                  className="bg-green-500/20 text-green-300 px-3 py-1 rounded hover:bg-green-500/30"
                >
                  ✓
                </button>
                <button 
                  onClick={() => updateReviewStatus(r.id, 'rejected')}
                  className="bg-red-500/20 text-red-300 px-3 py-1 rounded hover:bg-red-500/30"
                >
                  ✗
                </button>
                <button 
                  onClick={() => deleteReview(r.id)}
                  className="bg-gray-500/20 text-gray-300 px-3 py-1 rounded hover:bg-gray-500/30"
                >
                  Видалити
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-yellow-400 mt-12 mb-6">Заявки</h2>
      <div className="space-y-4">
        {orders.map((order, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded">
            <p><strong>Ім'я:</strong> {order.name}</p>
            <p><strong>Телефон:</strong> {order.phone}</p>
            <p><strong>Дата:</strong> {new Date(order.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}