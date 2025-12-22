import Reveal from "./Reveal"

const items = [
  {
    title: "Сертифікація та безпека",
    text: "Продукт проходить перевірку якості та контроль безпеки перед постачанням.",
  },
  {
    title: "Лабораторні тести",
    text: "Формула створена на основі натуральних компонентів і перевіряється на відповідність стандартам якості.",
  },
  {
    title: "Клінічні спостереження",
    text: "Результати застосування підтверджують відчутне покращення витривалості та якості статевого акту.",
  },
  {
    title: "Підтримка фахівців",
    text: "Рекомендаційний підхід: діяти вчасно та підтримувати організм без агресивної “хімії”.",
  },
]

export default function Trust() {
  return (
    <section className="relative text-white py-24 overflow-hidden">
      {/* IMAGE BACKGROUND */}
      <div
        className="
          absolute inset-0
          bg-[url('/trust-vertical.png')]
          bg-center bg-no-repeat bg-cover
          opacity-[0.18]
        "
      />

      {/* DARK OVERLAY for readability */}
      <div className="absolute inset-0 bg-black/80" />

      {/* GLOWS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff6a0018,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#d4af3712,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

      <div className="relative container mx-auto px-6 max-w-6xl">
        {/* HEADER */}
        <Reveal>
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.35em] text-xs text-yellow-300/80 mb-3">
              довіра та підтвердження
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-yellow-400">
              ПЕРЕВІРЕНО • СТАБІЛЬНО • ПРЕМІУМ
            </h2>
            <p className="text-neutral-300 mt-4 max-w-2xl mx-auto">
              Контроль якості, натуральна формула та зрозумілий підхід без
              “таблеток на раз”.
            </p>
          </div>
        </Reveal>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <Reveal key={it.title} delay={idx * 0.06}>
              <div
                className="
                  relative rounded-2xl
                  border border-yellow-400/15
                  bg-black/55 backdrop-blur-[2px]
                  p-6 overflow-hidden
                "
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[radial-gradient(circle,#ff6a0025,transparent_60%)]" />

                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-black/50 border border-yellow-400/20 shadow-[0_0_18px_#ff6a001a] flex items-center justify-center mb-4">
                    <span className="text-yellow-400 font-bold">✓</span>
                  </div>

                  <h3 className="font-bold text-yellow-300 tracking-wide">
                    {it.title}
                  </h3>
                  <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                    {it.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* DISCLAIMER */}
        <Reveal delay={0.08}>
          <div className="mt-14 rounded-2xl border border-yellow-400/15 bg-black/60 p-6 text-center">
            <p className="text-neutral-200">
              Важливо:{" "}
              <span className="text-yellow-300 font-semibold">
                не є лікарським засобом
              </span>
              . Результат залежить від індивідуальних особливостей та регулярності
              застосування.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
