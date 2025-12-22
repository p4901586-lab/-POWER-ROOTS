import Reveal from "./Reveal"

export default function Hero() {
  const OLD_PRICE = 1250
  const NEW_PRICE = 600
  const SAVINGS = OLD_PRICE - NEW_PRICE // 650

  return (
    <section className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/ogo.png')" }}
      />

      {/* dark overlay for readability */}
      <div className="absolute inset-0 bg-black/65" />

      {/* golden glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffb30030,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#ff6a0020,transparent_60%)]" />

      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#000_80%)]" />

      {/* texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

      <div className="relative container mx-auto px-6 text-center">
        <Reveal>
          <p className="uppercase tracking-[0.35em] text-xs text-yellow-300/80 mb-4">
            Premium Ginseng Extract
          </p>
        </Reveal>

        <Reveal delay={0.04}>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wider text-yellow-400 mb-5">
            POWER ROOTS
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-lg text-neutral-200 max-w-2xl mx-auto">
            ENERGY • LIBIDO • PERFORMANCE
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="
              mt-6 h-px max-w-xl mx-auto
              bg-linear-to-r from-transparent via-yellow-400/30 to-transparent
            "
          />
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-6 text-neutral-300 max-w-2xl mx-auto">
            Потужна підтримка енергії та чоловічої витривалості у преміум-форматі.
          </p>
        </Reveal>

        {/* Pricing */}
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-col items-center gap-2">
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
              <span className="text-yellow-300 font-semibold">
                {SAVINGS} грн
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="#order"
            className="
              inline-flex items-center justify-center
              mt-10
              bg-linear-to-r from-yellow-400 to-orange-500
              text-black px-10 py-4 rounded-xl
              font-bold tracking-wide
              hover:scale-105 transition
              shadow-[0_0_30px_#ff6a00]
            "
          >
            ОТРИМАТИ ЗІ ЗНИЖКОЮ
          </a>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-5 text-xs text-neutral-500">
            *Кількість упаковок за акцією обмежена
          </p>
        </Reveal>
      </div>
    </section>
  )
}
