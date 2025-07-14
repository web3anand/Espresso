import { useRef, useState, useEffect } from 'react';

export default function App() {
  const [imageSrc, setImageSrc] = useState('');
  const canvasRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result.toString());
    reader.readAsDataURL(file);
  }

  function handleSample(e) {
    const sample = e.target.value;
    if (sample) setImageSrc(sample);
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw espresso-style blobs
    const blobs = [
      ['#6d28d9', 120, 120, 140],
      ['#db2777', 280, 160, 100],
      ['#22d3ee', 180, 280, 120],
    ];
    blobs.forEach(([color, x, y, r]) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(200, 200, 180, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, 400, 400);
      ctx.restore();
    };
    img.src = imageSrc;
  }

  useEffect(draw, [imageSrc]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'pfp.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 space-y-6">
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold">Custom PFP Generator</h1>
      </header>
      <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="block w-full text-sm text-gray-200"
        />
        <select onChange={handleSample} className="w-full p-2 bg-gray-800 rounded">
          <option value="">Load Sample</option>
          <option value="/samples/sample1.svg">Sample 1</option>
          <option value="/samples/sample2.svg">Sample 2</option>
          <option value="/samples/sample3.svg">Sample 3</option>
        </select>
        <canvas ref={canvasRef} width="400" height="400" className="bg-gray-900 rounded-xl"></canvas>
        <button
          onClick={download}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Generate &amp; Download PFP
        </button>
      </div>
    </div>
  );
}
