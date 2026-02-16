import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "redis"

const REDIS_URL =
  process.env.REDIS_URL ||
  process.env.STORAGE_URL || // <-- якщо префікс STORAGE
  process.env.UPSTASH_REDIS_REST_URL // fallback (інколи є)

if (!REDIS_URL) {
  console.error("Missing REDIS_URL / STORAGE_URL env var")
}

const client = createClient({
  url: REDIS_URL,
})

let connected = false
async function getRedis() {
  if (!connected) {
    await client.connect()
    connected = true
  }
  return client
}

const KEY = "orders:list"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const redis = await getRedis()

    // ---------- GET ----------
    if (req.method === "GET") {
      const items = await redis.lRange(KEY, 0, 999) // newest first
      const orders = items.map((s) => JSON.parse(s))
      return res.status(200).json({ orders })
    }

    // ---------- POST ----------
    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body

      // приймаємо і region і oblast, щоб ти не парився
      const payload = {
        firstName: (body?.firstName || "").trim(),
        lastName: (body?.lastName || "").trim(),
        middleName: (body?.middleName || "").trim(),
        phone: (body?.phone || "").trim(),
        oblast: (body?.oblast || body?.region || "").trim(),
        city: (body?.city || "").trim(),
        npBranch: (body?.npBranch || "").trim(),
        qty: Number(body?.qty || 1),
        total: Number(body?.total || 0),
        date: new Date().toISOString(),
      }

      if (
        !payload.firstName ||
        !payload.lastName ||
        !payload.middleName ||
        !payload.phone ||
        !payload.oblast ||
        !payload.city ||
        !payload.npBranch
      ) {
        return res.status(400).json({ error: "Заповніть усі поля" })
      }

      // додаємо НА ПОЧАТОК списку (щоб Замовлення 1 було найновіше)
      await redis.lPush(KEY, JSON.stringify(payload))

      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: "Method not allowed" })
  } catch (e: any) {
    console.error("orders api error:", e)
    return res.status(500).json({ error: e?.message || "Server error" })
  }
}
