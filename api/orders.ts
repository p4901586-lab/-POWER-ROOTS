import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "redis"

type Order = {
  id: string
  firstName: string
  lastName: string
  middleName: string
  phone: string
  region: string
  city: string
  npBranch: string
  qty: number
  total: number
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

const KEY = "orders:list"

function json(res: VercelResponse, status: number, data: any) {
  res.status(status).setHeader("Content-Type", "application/json")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.end(JSON.stringify(data))
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") return json(res, 200, { ok: true })

  try {
    const redis = await getRedis()

    if (req.method === "GET") {
      const raw = (await redis.lRange(KEY, 0, -1)) as string[]
      const orders = raw
        .map((s) => JSON.parse(s) as Order)
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      return json(res, 200, { orders })
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body

      // мінімальна валідація
      const required = ["firstName", "lastName", "middleName", "phone", "region", "city", "npBranch"]
      for (const k of required) {
        if (!body?.[k] || String(body[k]).trim() === "") {
          return json(res, 400, { error: `Missing field: ${k}` })
        }
      }

      const order: Order = {
        id: crypto.randomUUID(),
        firstName: String(body.firstName).trim(),
        lastName: String(body.lastName).trim(),
        middleName: String(body.middleName).trim(),
        phone: String(body.phone).trim(),
        region: String(body.region).trim(),
        city: String(body.city).trim(),
        npBranch: String(body.npBranch).trim(),
        qty: Number(body.qty) || 1,
        total: Number(body.total) || 0,
        createdAt: new Date().toISOString(),
      }

      await redis.lPush(KEY, JSON.stringify(order))
      // щоб не ріс безкінечно (наприклад 2000 останніх)
      await redis.lTrim(KEY, 0, 1999)

      return json(res, 200, { ok: true, order })
    }

    return json(res, 405, { error: "Method not allowed" })
  } catch (e: any) {
    return json(res, 500, { error: e?.message || "Server error" })
  }
}
