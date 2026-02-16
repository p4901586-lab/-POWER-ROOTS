import { useState } from "react"
import AdminPanel from "../components/AdminPanel"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "1739") {
      setAuthenticated(true)
    } else {
      alert("Невірний пароль")
    }
  }

  if (authenticated) {
    return <AdminPanel />
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-xl mb-4">Вхід в адмін панель</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-white rounded"
        />
        <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded">
          Увійти
        </button>
      </form>
    </div>
  )
}