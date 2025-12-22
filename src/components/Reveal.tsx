import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function Reveal({
  children,
  className,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const inView = useInView(ref, {
    amount: 0.2,
    once: false,
    margin: "-80px 0px -80px 0px", // трохи м’якше спрацьовує
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 28, filter: "blur(6px)" }
      }
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 28, filter: "blur(6px)" }
      }
      transition={{
        duration: 0.65,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
