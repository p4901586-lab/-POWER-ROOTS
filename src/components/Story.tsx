import Reveal from "./Reveal"
import { story } from "../data/content"
import Countdown from "./Countdown"

export default function Story() {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-[0.22]"
        style={{ backgroundImage: "url('/story-bg.png')" }}
      />

      {/* DARK OVERLAY for readability */}
      <div className="absolute inset-0 bg-black/80" />

      {/* GLOWS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff6a0018,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#d4af3712,transparent_60%)]" />

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000_85%)]" />

      {/* TEXTURE */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

      <div className="relative container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.35em] text-xs text-yellow-300/80 mb-3">
              {story.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-yellow-400">
              Сучасний підхід без крайнощів
            </h2>
            <p className="text-neutral-300 mt-4 max-w-3xl mx-auto leading-relaxed">
              {story.intro.join(" ")}
            </p>
          </div>
        </Reveal>

        {/* Claim */}
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-yellow-400/15 bg-black/55 backdrop-blur-[2px] p-6 md:p-8 mb-10">
            <p className="text-lg md:text-xl text-neutral-200">
              <span className="text-yellow-300 font-semibold">Ключове:</span>{" "}
              {story.claim}
            </p>
          </div>
        </Reveal>

        {/* Promo */}
        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-yellow-400/15 bg-black/60 backdrop-blur-[2px] p-6 md:p-8 mb-10 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-yellow-300 tracking-wide">
              {story.promo.title}
            </h3>
            <p className="text-neutral-300 mt-3">{story.promo.text}</p>
            <p className="text-neutral-400 text-sm mt-2">{story.promo.until}</p>

            <Countdown />

            <a
              href="#order"
              className="
                inline-flex items-center justify-center
                mt-6
                bg-linear-to-r from-yellow-400 to-orange-500
                text-black px-8 py-3 rounded-xl
                font-bold tracking-wide
                hover:scale-[1.03] transition
                shadow-[0_0_26px_#ff6a00]
              "
            >
              {story.promo.cta}
            </a>
          </div>
        </Reveal>

        {/* Grid blocks */}
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal delay={0.02}>
            <Card
              title={story.stats.title}
              lead={story.stats.lead}
              bullets={story.stats.bullets}
              note={story.stats.note}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <Card
              title={story.chemistry.title}
              bullets={story.chemistry.bullets}
              note={story.chemistry.note}
            />
          </Reveal>

          <Reveal delay={0.14}>
            <TextCard title={story.solution.title} text={story.solution.text} />
          </Reveal>

          <Reveal delay={0.2}>
            <Card
              title={story.expectations.title}
              bullets={story.expectations.bullets}
              note={story.expectations.disclaimer}
            />
          </Reveal>
        </div>

        {/* How to use */}
        <Reveal delay={0.08}>
          <div className="mt-10 rounded-2xl border border-yellow-400/15 bg-black/55 backdrop-blur-[2px] p-6 md:p-8">
            <h3 className="text-xl font-bold text-yellow-300 tracking-wide">
              {story.howToUse.title}
            </h3>
            <p className="text-neutral-200 mt-3">{story.howToUse.text}</p>
            <p className="text-neutral-400 text-sm mt-4">
              {story.howToUse.disclaimer}
            </p>
          </div>
        </Reveal>

        {/* Fakes */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-orange-500/20 bg-black/60 backdrop-blur-[2px] p-6 md:p-8">
            <h3 className="text-xl font-bold text-yellow-300 tracking-wide">
              {story.fakes.title}
            </h3>
            <p className="text-neutral-200 mt-3">{story.fakes.text}</p>

            <div className="mt-6 h-px bg-linear-to-r from-transparent via-orange-500/25 to-transparent" />

            <p className="text-neutral-400 text-sm mt-5">
              Порада: залишайте заявку нижче — це швидко, конфіденційно та без
              зайвих дзвінків “кудись”.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Card({
  title,
  lead,
  bullets,
  note,
}: {
  title: string
  lead?: string
  bullets: string[]
  note?: string
}) {
  return (
    <div className="relative rounded-2xl border border-yellow-400/15 bg-black/55 backdrop-blur-[2px] p-6 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[radial-gradient(circle,#ff6a0025,transparent_60%)]" />
      <div className="relative">
        <h3 className="text-lg font-bold text-yellow-300 tracking-wide">
          {title}
        </h3>
        {lead ? <p className="text-neutral-300 mt-3">{lead}</p> : null}

        <ul className="mt-4 space-y-3">
          {bullets.map((t, i) => (
            <li key={i} className="flex items-start gap-3 text-neutral-200">
              <span className="mt-2 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_18px_#ff6a00]" />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        {note ? (
          <p className="text-neutral-400 text-sm mt-5 leading-relaxed">{note}</p>
        ) : null}
      </div>
    </div>
  )
}

function TextCard({ title, text }: { title: string; text: string[] }) {
  return (
    <div className="rounded-2xl border border-yellow-400/15 bg-black/60 backdrop-blur-[2px] p-6">
      <h3 className="text-lg font-bold text-yellow-300 tracking-wide">
        {title}
      </h3>
      <div className="mt-4 space-y-3 text-neutral-200 leading-relaxed">
        {text.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  )
}
