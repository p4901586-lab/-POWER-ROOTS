import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -18, opacity: 0, filter: "blur(6px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300",
        scrolled
          ? "bg-black/70 backdrop-blur-md border-b border-yellow-400/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <motion.a
          href="#top"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="
              h-10 w-10 rounded-xl
              border border-yellow-400/20
              bg-black/40
              flex items-center justify-center
              shadow-[0_0_18px_#ff6a001a]
            "
          >
            <img
              src="/logo.png"
              alt="POWER ROOTS logo"
              className="h-7 w-7 object-contain"
            />
          </div>

          <div className="leading-tight">
            <div className="text-yellow-400 font-extrabold tracking-wider">
              POWER ROOTS
            </div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">
              premium extract
            </div>
          </div>
        </motion.a>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#order"
            className="
              hidden sm:inline-flex
              items-center justify-center
              px-5 py-2.5 rounded-xl
              bg-white/5 border border-yellow-400/15
              text-neutral-200 font-semibold
              hover:bg-white/10 transition
            "
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            Деталі
          </motion.a>

          <motion.a
            href="#order"
            className="
              inline-flex items-center justify-center
              px-5 py-2.5 rounded-xl
              bg-linear-to-r from-yellow-400 to-orange-500
              text-black font-extrabold tracking-wide
              hover:scale-[1.03] transition
              shadow-[0_0_22px_#ff6a00]
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            Отримати зі знижкою
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}
