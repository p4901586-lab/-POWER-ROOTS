import type { VercelRequest, VercelResponse } from "@vercel/node"
import { createClient } from "redis"

let client: ReturnType<typeof createClient> | null = null

async function getRedis() {
  const url = process.env.REDIS_URL
  if (!url) throw new Error("Missing REDIS_URL env variable")

  if (!client) {
    client = createClient({ url })
    client.on("error", () => {}) // щоб не валило логами
    await client.connect()
  }

  return client
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const redis = await getRedis()
    await redis.set("ping", "ok")
    const v = await redis.get("ping")
    return res.status(200).json({ ping: v })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Redis error" })
  }
}
