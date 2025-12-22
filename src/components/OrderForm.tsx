import Countdown from "./Countdown"
import Reveal from "./Reveal"
import { useState } from "react"

export default function OrderForm() {
  const OLD_PRICE = 1250
  const NEW_PRICE = 600
  const SAVINGS = OLD_PRICE - NEW_PRICE // 650

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && phone.trim()) {
      const newOrder = {
        name: name.trim(),
        phone: phone.trim(),
        date: new Date().toISOString()
      }
      const existing = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([...existing, newOrder]))
      setName("")
      setPhone("")
      alert("Заявка відправлена! Ми зв’яжемося з вами найближчим часом.")
    }
  }

  return (
    <section id="order" className="relative bg-black text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff6a0016,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#d4af3710,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

      <div className="relative container mx-auto px-6 max-w-xl text-center">
        {/* Header */}
        <Reveal>
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-yellow-300/80 mb-3">
              акційна пропозиція
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-yellow-400 mb-4">
              ОТРИМАЙТЕ POWER ROOTS ЗІ ЗНИЖКОЮ
            </h2>

            <p className="text-neutral-300 mb-6">
              Залиште заявку — ми зв’яжемося з вами для підтвердження.
            </p>
          </div>
        </Reveal>

        {/* Pricing */}
        <Reveal delay={0.06}>
          <div className="mb-8 flex flex-col items-center gap-2">
            <div className="flex items-end gap-3">
              <span className="text-neutral-400 line-through text-lg">
                {OLD_PRICE} грн
              </span>
              <span className="text-yellow-300 font-extrabold text-4xl leading-none">
                {NEW_PRICE} грн
              </span>
            </div>

            <div className="text-sm text-neutral-300">
              Економія{" "}
              <span className="text-yellow-300 font-semibold">{SAVINGS} грн</span>
            </div>
          </div>
        </Reveal>

        {/* Countdown */}
        <Reveal delay={0.1}>
          <div className="mb-8">
            <Countdown />
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.14}>
          <form onSubmit={handleSubmit} className="space-y-4 text-left rounded-2xl border border-yellow-400/15 bg-black/55 backdrop-blur-[2px] p-6">
            <label className="block">
              <span className="text-sm text-neutral-300">Ім’я</span>
              <input
                className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                placeholder="Введіть ваше ім’я"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-sm text-neutral-300">Телефон</span>
              <input
                className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-yellow-400/15 text-white placeholder:text-neutral-500 outline-none focus:border-yellow-400/40"
                placeholder="Введіть номер телефону"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <button
              type="submit"
              className="
                w-full mt-2
                bg-linear-to-r from-yellow-400 to-orange-500
                text-black py-4 rounded-xl font-bold tracking-wide
                hover:scale-[1.02] transition
                shadow-[0_0_30px_#ff6a00]
              "
            >
              ОТРИМАТИ ЗІ ЗНИЖКОЮ
            </button>

            <p className="text-xs text-neutral-400 leading-relaxed mt-4">
              Натискаючи кнопку, ви погоджуєтеся з обробкою персональних даних для зворотного зв’язку.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
