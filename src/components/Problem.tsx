import Reveal from "./Reveal"

export default function Problem() {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/stats-bg.png')" }}
      />

      {/* overlay for readability */}
      <div className="absolute inset-0 bg-black/75" />

      {/* subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff6a0012,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#ffb30014,transparent_60%)]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#000_82%)]" />

      {/* texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

      <div className="relative container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* left: big stat */}
          <Reveal delay={0.02}>
            <div className="rounded-2xl border border-yellow-400/20 bg-black/45 backdrop-blur-[2px] p-8">
              <p className="uppercase tracking-[0.35em] text-xs text-yellow-300/80 mb-3">
                статистика
              </p>

              <div className="flex items-end gap-4">
                <div className="text-6xl md:text-7xl font-extrabold text-yellow-400 leading-none">
                  7<span className="text-yellow-300">/10</span>
                </div>
                <div className="text-neutral-300 pb-2">
                  чоловіків <span className="text-white font-semibold">35+</span>
                </div>
              </div>

              <p className="text-neutral-300 mt-5 leading-relaxed">
                Періодично стикаються з проблемами потенції.
              </p>

              <div className="mt-6 h-px bg-linear-to-r from-transparent via-yellow-400/30 to-transparent" />

              <p className="text-neutral-400 mt-6 text-sm leading-relaxed">
                Часто проблему “маскують” синтетичними препаратами, які дають
                короткий ефект, але не вирішують причину.
              </p>
            </div>
          </Reveal>

          {/* right: key points */}
          <Reveal delay={0.10}>
            <div className="rounded-2xl border border-yellow-400/15 bg-black/45 backdrop-blur-[2px] p-8">
              <h3 className="text-xl font-bold tracking-widest text-yellow-400 mb-6">
                ЧОМУ ЦЕ ВАЖЛИВО
              </h3>

              <ul className="space-y-4 text-neutral-200">
                <li className="flex gap-3">
                  <span className="mt-2 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_18px_#ff6a00]" />
                  <span>Невдачі знижують впевненість та посилюють стрес.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_18px_#ff6a00]" />
                  <span>
                    “Хімія” може викликати побічні ефекти і формує залежність від
                    таблетки.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_18px_#ff6a00]" />
                  <span>
                    Натуральний підхід допомагає підтримувати форму без різких
                    “гойдалок”.
                  </span>
                </li>
              </ul>

              <div className="mt-8 rounded-xl border border-yellow-400/15 bg-white/5 p-5">
                <p className="text-yellow-300 font-semibold">
                  Здорова потенція до 75 років — це норма.
                </p>
                <p className="text-neutral-300 text-sm mt-2">
                  Важливо діяти вчасно та підтримувати організм правильно.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
