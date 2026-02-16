import { Link } from "react-router-dom"
import Reveal from "../components/Reveal"

export default function Thanks() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">
      {/* background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/ogo.png')" }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* golden energy glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffb30035,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#ff6a0025,transparent_60%)]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#000_85%)]" />

      {/* texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

      {/* content */}
      <div className="relative max-w-xl text-center">
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-6">
            Дякуємо за замовлення!
          </h1>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="text-neutral-200 text-lg mb-6">
            Ми вже отримали вашу заявку та готуємо замовлення найближчим часом для доставки.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-neutral-300 mb-10">
            Бажаємо вам більше енергії, впевненості у собі  
            та стабільного чоловічого тонусу щодня 💪  
            <br />
            <span className="text-yellow-300 font-semibold">
              POWER ROOTS
            </span>{" "}
            — підтримка, яка працює.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Link
            to="/"
            className="
              inline-flex items-center justify-center
              bg-linear-to-r from-yellow-400 to-orange-500
              text-black px-10 py-4 rounded-xl
              font-bold tracking-wide
              hover:scale-105 transition
              shadow-[0_0_35px_#ff6a00]
            "
          >
            Повернутись на головну
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
