import { useEffect, useState } from "react"

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

export default function Countdown() {
  const [remaining, setRemaining] = useState(24 * 60 * 60) // 24 hours in seconds

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          return 24 * 60 * 60 // reset to 24 hours
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const hours = Math.floor(remaining / 3600)
  const minutes = Math.floor((remaining % 3600) / 60)
  const seconds = remaining % 60

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-yellow-400/20 bg-black/40 px-4 py-3">
      <span className="uppercase tracking-[0.25em] text-[10px] text-yellow-300/80">
        до кінця акції
      </span>

      <div className="flex items-center gap-2 font-bold">
        <TimeBox label="год" value={pad2(hours)} />
        <span className="text-yellow-300/70">:</span>
        <TimeBox label="хв" value={pad2(minutes)} />
        <span className="text-yellow-300/70">:</span>
        <TimeBox label="сек" value={pad2(seconds)} />
      </div>
    </div>
  )
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
<div className="min-w-13.5 text-center rounded-xl ...">
      <div className="text-yellow-300 text-lg leading-none">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">
        {label}
      </div>
    </div>
  )
}
