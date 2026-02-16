import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "redis"

const REDIS_URL = process.env.REDIS_URL || process.env.STORAGE_URL

const client = createClient({ url: REDIS_URL })
let connected = false
async function getRedis() {
  if (!connected) {
    await client.connect()
    connected = true
  }
  return client
}

const KEY = "reviews:list"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const redis = await getRedis()

    if (req.method === "GET") {
      const items = await redis.lRange(KEY, 0, 999)
      const reviews = items.map((s) => JSON.parse(s))
      return res.status(200).json({ reviews })
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body

      const payload = {
        ...body,
        date: body?.date || new Date().toISOString(),
      }

      await redis.lPush(KEY, JSON.stringify(payload))
      return res.status(200).json({ ok: true })
    }

    return res.status(405).json({ error: "Method not allowed" })
  } catch (e: any) {
    console.error("reviews api error:", e)
    return res.status(500).json({ error: e?.message || "Server error" })
  }
}
