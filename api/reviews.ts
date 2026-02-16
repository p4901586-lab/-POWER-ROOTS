import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "redis"

type Review = {
  id: string
  name: string
  text: string
  status: "approved" | "pending" | "rejected"
  createdAt: string
}

let client: ReturnType<typeof createClient> | null = null
async function getRedis() {
  const url = process.env.REDIS_URL
  if (!url) throw new Error("Missing REDIS_URL env variable")
  if (!client) {
    client = createClient({ url })
    client.on("error", () => {})
    await client.connect()
  }
  return client
}

const KEY = "reviews:list"

function json(res: VercelResponse, status: number, data: any) {
  res.status(status).setHeader("Content-Type", "application/json")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.end(JSON.stringify(data))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return json(res, 200, { ok: true })

  try {
    const redis = await getRedis()

    if (req.method === "GET") {
      const raw = (await redis.lRange(KEY, 0, -1)) as string[]
      const reviews = raw
        .map((s) => JSON.parse(s) as Review)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      return json(res, 200, { reviews })
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body
      if (!body?.name || !body?.text) return json(res, 400, { error: "Missing name/text" })

      const review: Review = {
        id: crypto.randomUUID(),
        name: String(body.name).trim(),
        text: String(body.text).trim(),
        status: (body.status as Review["status"]) || "pending",
        createdAt: new Date().toISOString(),
      }

      await redis.lPush(KEY, JSON.stringify(review))
      await redis.lTrim(KEY, 0, 1999)
      return json(res, 200, { ok: true, review })
    }

    // Оновлення статусу / редагування
    if (req.method === "PATCH") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body
      const id = String(body?.id || "")
      if (!id) return json(res, 400, { error: "Missing id" })

      const raw = (await redis.lRange(KEY, 0, -1)) as string[]
      const reviews = raw.map((s) => JSON.parse(s) as Review)
      const idx = reviews.findIndex((r) => r.id === id)
      if (idx === -1) return json(res, 404, { error: "Not found" })

      reviews[idx] = {
        ...reviews[idx],
        status: body.status ?? reviews[idx].status,
        name: body.name ?? reviews[idx].name,
        text: body.text ?? reviews[idx].text,
      }

      // перезапис списку (просто і надійно)
      await redis.del(KEY)
      for (const r of reviews.reverse()) {
        await redis.lPush(KEY, JSON.stringify(r))
      }
      return json(res, 200, { ok: true })
    }

    if (req.method === "DELETE") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body
      const id = String(body?.id || "")
      if (!id) return json(res, 400, { error: "Missing id" })

      const raw = (await redis.lRange(KEY, 0, -1)) as string[]
      const reviews = raw.map((s) => JSON.parse(s) as Review).filter((r) => r.id !== id)

      await redis.del(KEY)
      for (const r of reviews.reverse()) {
        await redis.lPush(KEY, JSON.stringify(r))
      }
      return json(res, 200, { ok: true })
    }

    return json(res, 405, { error: "Method not allowed" })
  } catch (e: any) {
    return json(res, 500, { error: e?.message || "Server error" })
  }
}
