import { useState } from 'react'
import Connect from './pages/Connect'
import ViewFlex from './pages/ViewFlex'
import UploadNFT from './pages/UploadNFT'
import { Mindshare } from './api/mindshare'
import './App.css'

interface UserData {
  handle: string
  name: string
  pfp: string
  mindshare: Mindshare
  nft?: string
}

export default function App() {
  const [page, setPage] = useState<'connect' | 'view' | 'upload'>('connect')
  const [data, setData] = useState<UserData | null>(null)

  if (page === 'connect' || !data) {
    return (
      <Connect
        onConnected={(d) => {
          setData(d)
          setPage('view')
        }}
      />
    )
  }

  if (page === 'upload' && data) {
    return (
      <UploadNFT
        onUpload={(url) => {
          setData({ ...data, nft: url })
          setPage('view')
        }}
      />
    )
  }

  return (
    <ViewFlex data={data} onUploadClick={() => setPage('upload')} />
  )
}
