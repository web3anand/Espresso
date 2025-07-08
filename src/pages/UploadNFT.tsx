interface Props {
  onUpload: (url: string) => void
}

export default function UploadNFT({ onUpload }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onUpload(url)
    }
  }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Upload NFT</h1>
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  )
}
