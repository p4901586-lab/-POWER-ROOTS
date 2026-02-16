import { useEffect, useMemo, useState } from "react"

type Props = {
  open: boolean
  onClose: () => void
}

export default function OrderModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false)

  // fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [phone, setPhone] = useState("")
  const [oblast, setOblast] = useState("")
  const [city, setCity] = useState("")
  const [npBranch, setNpBranch] = useState("")
  const [qty, setQty] = useState(1)

  // show/hide with animation
  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  // pricing logic:
  // 1 = 599
  // 2 = 999
  // 3+ = 999 + (qty-2)*400  => 3=1399, 4=1799 ...
  const total = useMemo(() => {
    if (qty <= 1) return 599
    if (qty === 2) return 999
    return 999 + (qty - 2) * 400
  }, [qty])

  const perBottle = useMemo(() => Math.round(total / qty), [total, qty])

  const reset = () => {
    setFirstName("")
    setLastName("")
    setMiddleName("")
    setPhone("")
    setOblast("")
    setCity("")
    setNpBranch("")
    setQty(1)
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const payload = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    middleName: middleName.trim(),
    phone: phone.trim(),
    region: oblast.trim(),      // <— важливо: в API поле region
    city: city.trim(),
    npBranch: npBranch.trim(),
    qty,
    total,
  }

  if (
    !payload.firstName ||
    !payload.lastName ||
    !payload.middleName ||
    !payload.phone ||
    !payload.region ||
    !payload.city ||
    !payload.npBranch
  ) {
    alert("Будь ласка, заповніть усі поля ✅")
    return
  }

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      alert(err?.error || "Помилка відправки заявки")
      return
    }

    reset()
    onClose()
    window.location.href = "/thanks"
  } catch (err) {
    alert("Немає зв’язку. Спробуйте ще раз.")
  }
}


  if (!open && !mounted) return null

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-black/75 backdrop-blur-sm
          transition-opacity duration-200
          ${open ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* modal */}
      <div className="absolute inset-0 flex items-end md:items-center justify-center p-4">
<div
  className={`
    relative w-full max-w-xl
    max-h-[90vh] overflow-y-auto
    rounded-2xl border border-yellow-400/15
    bg-black/90 text-white
    shadow-[0_0_60px_rgba(255,122,0,0.25)]
    transition-all duration-200
    ${open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]"}
  `}
>

          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="uppercase tracking-[0.35em] text-xs text-yellow-300/80">
                  оформлення заявки
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-yellow-400">
                  Замовлення POWER ROOTS
                </h3>
                <p className="mt-2 text-sm text-neutral-300">
                  Заповніть дані для доставки Новою Поштою
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose()
                }}
                className="text-neutral-300 hover:text-white text-2xl leading-none"
                aria-label="Закрити"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-left">
              {/* names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-neutral-300">Ім’я</span>
                  <input
                    required
                    className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                    placeholder="Введіть ім’я"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-neutral-300">Прізвище</span>
                  <input
                    required
                    className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                    placeholder="Введіть прізвище"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-neutral-300">По батькові</span>
                <input
                  required
                  className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                  placeholder="Введіть по батькові"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm text-neutral-300">Телефон</span>
                <input
                  required
                  className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                  placeholder="+380..."
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              {/* delivery */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-neutral-300">Область</span>
                  <input
                    required
                    className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                    placeholder="Напр. Київська"
                    value={oblast}
                    onChange={(e) => setOblast(e.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-neutral-300">Місто (село)</span>
                  <input
                    required
                    className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                    placeholder="Напр. Київ"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm text-neutral-300">Відділення Нової Пошти</span>
                <input
                  required
                  className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                  placeholder="Напр. №12"
                  value={npBranch}
                  onChange={(e) => setNpBranch(e.target.value)}
                />
              </label>

              {/* qty calculator */}
              <div className="pt-1">
                <div className="rounded-2xl border border-yellow-400/15 bg-black/35 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-12 h-12 rounded-xl border border-yellow-400/15 bg-black/30 text-yellow-300 text-2xl hover:border-yellow-400/35 transition"
                        aria-label="Зменшити"
                      >
                        −
                      </button>

                      <div className="min-w-[64px] text-center">
                        <div className="text-2xl font-extrabold text-yellow-300 leading-none">
                          {qty}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1">шт</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.min(10, q + 1))}
                        className="w-12 h-12 rounded-xl border border-yellow-400/15 bg-black/30 text-yellow-300 text-2xl hover:border-yellow-400/35 transition"
                        aria-label="Збільшити"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setQty(n)}
                        className={`
                          px-4 py-2 rounded-xl border
                          ${qty === n ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-300" : "border-yellow-400/15 bg-black/30 text-neutral-200"}
                          hover:border-yellow-400/35 transition
                        `}
                      >
                        {n} шт
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">Орієнтовно за 1 шт</p>
                      <p className="text-sm text-neutral-200 font-semibold">
                        ~{perBottle} грн / шт
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-neutral-500">До оплати</p>
                      <p className="text-2xl font-extrabold text-yellow-300">
                        {total} грн
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="
                  w-full mt-2
                  bg-linear-to-r from-yellow-400 to-orange-500
                  text-black py-4 rounded-xl font-extrabold tracking-wide
                  hover:scale-[1.02] transition
                  shadow-[0_0_30px_#ff6a00]
                "
              >
                ПІДТВЕРДИТИ ЗАМОВЛЕННЯ
              </button>

              <p className="text-xs text-neutral-400 leading-relaxed mt-3">
                Натискаючи кнопку, ви погоджуєтеся з обробкою персональних даних для зворотного зв’язку.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
