import { useEffect, useState } from 'react'

export function useCryptoPrice() {
  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        )
        const data = (await res.json()) as { ethereum: { usd: number } }
        setPrice(data.ethereum.usd)
      } catch {
        setPrice(null)
      }
    }
    void load()
  }, [])

  return price
}
