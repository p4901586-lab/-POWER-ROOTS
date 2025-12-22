import Reveal from "./Reveal"

const effects = [
  "Підвищує лібідо",
  "Дарує енергію та витривалість",
  "Покращує якість статевого акту",
  "Сприяє кращій ерекції",
]

const vitamins = ["B1", "B2", "B3", "B5", "B6", "B9", "C", "D", "E"]

export default function Benefits() {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/benefits-bg.png')" }}
      />

      {/* dark overlay for readability */}
      <div className="absolute inset-0 bg-black/75" />

      {/* warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff6a0018,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#d4af3714,transparent_55%)]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000_85%)]" />

      {/* texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

      <div className="relative container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.35em] text-xs text-yellow-300/80 mb-3">
              Premium Ginseng Extract
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-yellow-400">
              ПОТУЖНА ДІЯ • СКЛАД
            </h2>
            <p className="text-neutral-300 mt-4 max-w-2xl mx-auto">
              Енергія, лібідо та витривалість — без зайвої “хімії”.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Effects */}
          <Reveal delay={0.06}>
            <div className="relative rounded-2xl border border-yellow-400/25 bg-black/45 backdrop-blur-[2px] p-8 overflow-hidden">
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-[radial-gradient(circle,#ff6a0040,transparent_60%)]" />
              <h3 className="text-xl font-bold tracking-widest text-yellow-400 mb-6">
                ПОТУЖНА ДІЯ:
              </h3>

              <ul className="space-y-4">
                {effects.map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_18px_#ff6a00]" />
                    <span className="text-neutral-200">{t}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-yellow-300/90 italic text-lg">
                Насолоджуйся своєю силою!
              </p>
            </div>
          </Reveal>

          {/* Right: Composition */}
          <Reveal delay={0.12}>
            <div className="relative rounded-2xl border border-yellow-400/25 bg-black/45 backdrop-blur-[2px] p-8 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[radial-gradient(circle,#d4af3740,transparent_60%)]" />
              <h3 className="text-xl font-bold tracking-widest text-yellow-400 mb-6">
                СКЛАД:
              </h3>

              <div className="space-y-4 text-neutral-200">
                <p>
                  <span className="text-yellow-300">Екстракт кореня женьшеню</span>{" "}
                  <span className="text-neutral-300">&lt;Panax ginseng&gt;</span>
                </p>

                <div>
                  <p className="text-yellow-300 mb-3">Вітаміни:</p>
                  <div className="flex flex-wrap gap-2">
                    {vitamins.map((v) => (
                      <span
                        key={v}
                        className="
                          px-3 py-1 rounded-full text-sm
                          bg-black/40 border border-yellow-400/20
                          text-neutral-200 shadow-[0_0_18px_#ff6a001a]
                        "
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-yellow-400/15">
                  <p className="text-yellow-300 font-semibold mb-2">
                    Спосіб застосування:
                  </p>
                  <p className="text-neutral-200">
                    Приймати 1–2 піпетки за 20–30 хвилин до статевого акту.
                  </p>
                  <p className="text-neutral-400 text-sm mt-4">
                    Не є лікарським засобом. Зберігати в недоступному для дітей
                    місці.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom strip */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-yellow-400/15 bg-black/45 backdrop-blur-[2px] p-6 text-center">
            <p className="uppercase tracking-[0.25em] text-yellow-300/90 text-sm">
              ENERGY • LIBIDO • PERFORMANCE
            </p>
            <p className="text-neutral-400 text-sm mt-2">Обʼєм: 30 мл</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
