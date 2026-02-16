import { useEffect, useMemo, useState } from "react"
import { reviews as initialReviews } from "../data/content"

interface Review {
  name: string
  text: string
  status: "approved" | "pending" | "rejected"
  id: string
}

// Старий формат (перші версії форми)
type LegacyOrder = {
  name: string
  phone: string
  date: string
}

// Новий формат (з модалки)
type NewOrder = {
  firstName: string
  lastName: string
  middleName: string
  phone: string
  oblast: string
  city: string
  npBranch: string
  qty: number
  total: number
  date: string
}

type OrderAny = LegacyOrder | NewOrder

function isNewOrder(o: OrderAny): o is NewOrder {
  return (o as any).firstName !== undefined
}

export default function AdminPanel() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [orders, setOrders] = useState<OrderAny[]>([])
  const [openOrderIndex, setOpenOrderIndex] = useState<number | null>(null)

useEffect(() => {
  ;(async () => {
    // ---------- REVIEWS (як було, локально) ----------
    const stored = localStorage.getItem("reviews")
    if (stored) {
      setReviews(JSON.parse(stored))
    } else {
      const initial = initialReviews.map(r => ({
        ...r,
        status: "approved" as const,
        id: Math.random().toString(36),
      }))
      setReviews(initial)
      localStorage.setItem("reviews", JSON.stringify(initial))
    }

    // ---------- ORDERS (ГЛОБАЛЬНО з Redis) ----------
    try {
      const r = await fetch("/api/orders")
      if (r.ok) {
        const data = await r.json()
        setOrders((data.orders || []).slice().reverse())
      }
    } catch (e) {
      console.error("Failed to load orders", e)
    }
  })()
}, [])


  const updateReviewStatus = (id: string, status: "approved" | "pending" | "rejected") => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, status } : r))
    setReviews(updated)
    localStorage.setItem("reviews", JSON.stringify(updated))
  }

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id)
    setReviews(updated)
    localStorage.setItem("reviews", JSON.stringify(updated))
  }

  const filteredReviews = reviews.filter((r) => filter === "all" || r.status === filter)

  const formatDate = useMemo(() => {
    return (iso: string) => {
      const d = new Date(iso)
      // якщо кривий формат — fallback:
      if (Number.isNaN(d.getTime())) return iso
      const pad = (n: number) => String(n).padStart(2, "0")
      return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}, ${pad(
        d.getHours()
      )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    }
  }, [])

  const deleteOrder = (idx: number) => {
    const next = orders.filter((_, i) => i !== idx)
    setOrders(next)
    // зберігаємо назад у localStorage (повертаємо порядок як було)
    localStorage.setItem("orders", JSON.stringify(next.slice().reverse()))
    setOpenOrderIndex(null)
  }

  const copyOrder = async (o: OrderAny, number: number) => {
    let text = `Замовлення ${number}\n`

    if (isNewOrder(o)) {
      text +=
        `ПІБ: ${o.lastName} ${o.firstName} ${o.middleName}\n` +
        `Телефон: ${o.phone}\n` +
        `Область: ${o.oblast}\n` +
        `Місто/село: ${o.city}\n` +
        `Відділення НП: ${o.npBranch}\n` +
        `Кількість: ${o.qty}\n` +
        `До оплати: ${o.total} грн\n` +
        `Дата: ${formatDate(o.date)}`
    } else {
      text +=
        `Ім'я: ${o.name}\n` +
        `Телефон: ${o.phone}\n` +
        `Дата: ${formatDate(o.date)}`
    }

    await navigator.clipboard.writeText(text)
    alert("Скопійовано ✅")
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8">
        Адмін панель - Управління відгуками
      </h1>

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
        {filteredReviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-yellow-400/15 bg-black/55 p-6">
            <p className="text-neutral-200 leading-relaxed mb-4">"{r.text}"</p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-300 font-semibold">{r.name}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    r.status === "approved"
                      ? "bg-green-500/20 text-green-300"
                      : r.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {r.status === "approved"
                    ? "Підтверджено"
                    : r.status === "pending"
                    ? "Очікує"
                    : "Відхилено"}
                </span>
                <button
                  onClick={() => updateReviewStatus(r.id, "approved")}
                  className="bg-green-500/20 text-green-300 px-3 py-1 rounded hover:bg-green-500/30"
                >
                  ✓
                </button>
                <button
                  onClick={() => updateReviewStatus(r.id, "rejected")}
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

      {/* Orders */}
      <h2 className="text-2xl font-bold text-yellow-400 mt-12 mb-6">
        Заявки на замовлення
      </h2>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-yellow-400/15 bg-black/55 p-6 text-neutral-300">
          Поки що немає заявок.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o, idx) => {
            const isOpen = openOrderIndex === idx
            const number = idx + 1 // Замовлення 1 — найновіше

            const headerName = isNewOrder(o)
              ? `${o.lastName} ${o.firstName} ${o.middleName}`
              : o.name

            const headerPhone = isNewOrder(o) ? o.phone : o.phone
            const headerTotal = isNewOrder(o) ? `${o.total} грн` : ""

            return (
              <div
                key={`${headerPhone}-${(o as any).date}-${idx}`}
                className="rounded-2xl border border-yellow-400/15 bg-black/55 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenOrderIndex(isOpen ? null : idx)}
                  className="
                    w-full text-left
                    px-5 py-4
                    flex items-center justify-between gap-4
                    hover:bg-white/5 transition
                  "
                >
                  <div>
                    <div className="text-yellow-300 font-extrabold text-lg">
                      Замовлення {number}
                    </div>
                    <div className="text-sm text-neutral-400 mt-1">
                      {headerName} • {headerPhone}
                    </div>
                  </div>

                  <div className="text-right">
                    {headerTotal && (
                      <div className="text-yellow-300 font-extrabold">{headerTotal}</div>
                    )}
                    <div className="text-xs text-neutral-500 mt-1">
                      {formatDate((o as any).date)}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-yellow-400/10">
                    {isNewOrder(o) ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="rounded-xl bg-black/35 border border-yellow-400/10 p-4">
                          <div className="text-neutral-400 text-xs mb-2">Контактні дані</div>
                          <div>
                            <span className="text-neutral-400">ПІБ:</span>{" "}
                            {o.lastName} {o.firstName} {o.middleName}
                          </div>
                          <div className="mt-1">
                            <span className="text-neutral-400">Телефон:</span> {o.phone}
                          </div>
                        </div>

                        <div className="rounded-xl bg-black/35 border border-yellow-400/10 p-4">
                          <div className="text-neutral-400 text-xs mb-2">
                            Доставка (Нова Пошта)
                          </div>
                          <div>
                            <span className="text-neutral-400">Область:</span> {o.oblast}
                          </div>
                          <div className="mt-1">
                            <span className="text-neutral-400">Місто/село:</span> {o.city}
                          </div>
                          <div className="mt-1">
                            <span className="text-neutral-400">Відділення:</span> {o.npBranch}
                          </div>
                        </div>

                        <div className="rounded-xl bg-black/35 border border-yellow-400/10 p-4 md:col-span-2">
                          <div className="text-neutral-400 text-xs mb-2">Замовлення</div>
                          <div className="flex flex-wrap items-end justify-between gap-3">
                            <div>
                              <div>
                                <span className="text-neutral-400">Кількість:</span>{" "}
                                <span className="text-yellow-300 font-bold">{o.qty}</span>
                              </div>
                              <div className="mt-1 text-neutral-300">
                                <span className="text-neutral-400">Орієнтовно за 1 шт:</span>{" "}
                                ~{Math.round(o.total / o.qty)} грн
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-neutral-400 text-xs">До оплати</div>
                              <div className="text-2xl text-yellow-300 font-extrabold">
                                {o.total} грн
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-black/35 border border-yellow-400/10 p-4 text-sm">
                        <div className="text-neutral-400 text-xs mb-2">Стара заявка</div>
                        <div>
                          <span className="text-neutral-400">Ім'я:</span> {o.name}
                        </div>
                        <div className="mt-1">
                          <span className="text-neutral-400">Телефон:</span> {o.phone}
                        </div>
                        <div className="mt-1">
                          <span className="text-neutral-400">Дата:</span> {formatDate(o.date)}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => deleteOrder(idx)}
                        className="
                          px-4 py-2 rounded-xl
                          bg-red-500/15 border border-red-500/25
                          text-red-200 hover:bg-red-500/25 transition
                        "
                      >
                        Видалити
                      </button>

                      <button
                        type="button"
                        onClick={() => copyOrder(o, number)}
                        className="
                          px-4 py-2 rounded-xl
                          bg-yellow-400/10 border border-yellow-400/25
                          text-yellow-200 hover:bg-yellow-400/20 transition
                        "
                      >
                        Скопіювати
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
