const TOKEN_TTL_MS = 24 * 60 * 60 * 1000

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return toHex(signature)
}

export async function signAdminToken(username: string, secret: string): Promise<string> {
  const payload = btoa(JSON.stringify({ u: username, exp: Date.now() + TOKEN_TTL_MS }))
  const signature = await hmac(secret, payload)
  return `${payload}.${signature}`
}

export async function verifyAdminToken(token: string, secret: string): Promise<boolean> {
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  const expectedSignature = await hmac(secret, payload)
  if (signature !== expectedSignature) return false

  try {
    const { exp } = JSON.parse(atob(payload))
    return typeof exp === 'number' && Date.now() < exp
  } catch {
    return false
  }
}
