import { useMemo, useState, useEffect } from "react"
import { reviews as initialReviews } from "../data/content"
import Reveal from "./Reveal"


interface Review {
  name: string
  text: string
  status: 'approved' | 'pending' | 'rejected'
  id: string
}

export default function Reviews() {
  const [showAll, setShowAll] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState("")
  const [newText, setNewText] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("reviews")
    if (stored) {
      setReviews(JSON.parse(stored))
    } else {
      const initial = initialReviews.map(r => ({ ...r, status: 'approved' as const, id: Math.random().toString(36) }))
      setReviews(initial)
      localStorage.setItem("reviews", JSON.stringify(initial))
    }
  }, [])

  const approvedReviews = reviews.filter(r => r.status === 'approved')
  const shown = useMemo(() => (showAll ? approvedReviews : approvedReviews.slice(0, 4)), [showAll, approvedReviews])

  const addReview = () => {
    if (newName.trim() && newText.trim()) {
      const newReview: Review = { 
        name: newName.trim(), 
        text: newText.trim(), 
        status: 'pending', 
        id: Math.random().toString(36) 
      }
      const updated = [...reviews, newReview]
      setReviews(updated)
      localStorage.setItem("reviews", JSON.stringify(updated))
      setNewName("")
      setNewText("")
      setShowForm(false)
    }
  }

  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff6a0010,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#d4af3710,transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

      <div className="relative container mx-auto px-6 max-w-6xl">
        <Reveal>
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.35em] text-xs text-yellow-300/80 mb-3">
              відгуки
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-yellow-400">
              Досвід людей
            </h2>
            <p className="text-neutral-300 mt-4 max-w-2xl mx-auto">
              Коротко, по суті — як це відчувається в реальному житті.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-6 mr-4 inline-flex items-center justify-center bg-yellow-400/10 border border-yellow-400/20 px-6 py-3 rounded-xl text-yellow-300 font-semibold hover:bg-yellow-400/20 transition"
            >
              {showForm ? "Сховати форму" : "Залишити відгук"}
            </button>

          </div>
        </Reveal>

        {showForm && (
          <Reveal>
            <div className="max-w-2xl mx-auto mb-12 rounded-2xl border border-yellow-400/15 bg-black/55 backdrop-blur-[2px] p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Залишити відгук</h3>
              <input
                type="text"
                placeholder="Ваше ім'я"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mb-4 px-4 py-3 bg-black/50 border border-yellow-400/20 rounded-xl text-white placeholder-neutral-500 focus:border-yellow-400 focus:outline-none"
              />
              <textarea
                placeholder="Ваш відгук"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                rows={4}
                className="w-full mb-4 px-4 py-3 bg-black/50 border border-yellow-400/20 rounded-xl text-white placeholder-neutral-500 focus:border-yellow-400 focus:outline-none resize-none"
              />
              <button
                onClick={addReview}
                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-300 transition"
              >
                Додати відгук
              </button>
            </div>
          </Reveal>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {shown.map((r, idx) => (
            <Reveal key={r.id} delay={idx * 0.06}>
              <div className="rounded-2xl border border-yellow-400/15 bg-black/55 backdrop-blur-[2px] p-6">
                <p className="text-neutral-200 leading-relaxed">"{r.text}"</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-yellow-300 font-semibold">{r.name}</span>
                  <span className="text-xs text-neutral-500">
                    Перевірено • анонімно
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center justify-center bg-white/5 border border-yellow-400/15 px-6 py-3 rounded-xl text-neutral-200 font-semibold hover:bg-white/10 transition"
            >
              {showAll ? "Показати менше" : "Показати ще"}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
