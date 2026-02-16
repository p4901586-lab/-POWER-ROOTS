import Countdown from "./Countdown"
import Reveal from "./Reveal"
import { useState } from "react"
import OrderModal from "./OrderModal"

export default function OrderForm() {
  const OLD_PRICE = 1250
  const NEW_PRICE = 599
  const SAVINGS = 651 // 1250 - 599

  const [open, setOpen] = useState(false)

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
              Натисніть “Замовити” і заповніть дані для доставки Новою Поштою.
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

        {/* Button */}
        <Reveal delay={0.14}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              w-full
              bg-linear-to-r from-yellow-400 to-orange-500
              text-black py-5 rounded-xl font-extrabold tracking-wide text-lg
              hover:scale-[1.02] transition
              shadow-[0_0_30px_#ff6a00]
            "
          >
            ЗАМОВИТИ ПРЯМО ЗАРАЗ!
          </button>

          <p className="text-xs text-neutral-400 leading-relaxed mt-4">
            Натискаючи кнопку, ви погоджуєтеся з обробкою персональних даних для зворотного зв’язку.
          </p>
        </Reveal>
      </div>

      <OrderModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
