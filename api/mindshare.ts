export async function onRequestGet(context: { request: Request }) {
  const url = new URL(context.request.url)
  const handle = url.searchParams.get('handle')
  if (!handle) {
    return new Response(JSON.stringify({ error: 'missing handle' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  const apiKey = process.env.KAITO_API_KEY
  const resp = await fetch(`https://api.kaito.ai/mindshare/${handle}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  const data = await resp.json()
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  })
}
