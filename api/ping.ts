import type { VercelRequest, VercelResponse } from "@vercel/node"
import { kv } from "@vercel/kv"

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    await kv.set("ping", "ok")
    const v = await kv.get("ping")
    return res.status(200).json({ ping: v })
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "KV error" })
  }
}
