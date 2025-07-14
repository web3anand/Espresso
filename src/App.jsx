import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Circle, Group, Image as KonvaImage } from 'react-konva';

export default function App() {
  const stageRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!imgSrc) return;
    const img = new window.Image();
    img.src = imgSrc;
    img.onload = () => setImage(img);
  }, [imgSrc]);

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setImgSrc(URL.createObjectURL(file));
    }
  }

  function handleSample(e) {
    const value = e.target.value;
    if (value) {
      setImgSrc(value);
    }
  }

  function download() {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'pfp.png';
    link.href = uri;
    link.click();
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <header className="text-2xl font-bold mb-6">Custom PFP Generator</header>
      <div className="w-full max-w-sm space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full text-sm"
        />
        <select
          onChange={handleSample}
          className="w-full border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Load Sample...
          </option>
          <option value="/samples/sample1.svg">Sample 1</option>
          <option value="/samples/sample2.svg">Sample 2</option>
          <option value="/samples/sample3.svg">Sample 3</option>
        </select>
      </div>
      <div className="mt-6">
        <Stage ref={stageRef} width={400} height={400} className="border rounded">
          <Layer>
            <Circle x={120} y={120} radius={100} fill="#d946ef" opacity={0.6} />
            <Circle x={280} y={250} radius={120} fill="#22d3ee" opacity={0.5} />
            <Circle x={200} y={320} radius={80} fill="#f59e0b" opacity={0.4} />
            {image && (
              <Group
                clipFunc={(ctx) => {
                  ctx.arc(200, 200, 180, 0, Math.PI * 2);
                }}
              >
                <KonvaImage image={image} width={400} height={400} />
              </Group>
            )}
          </Layer>
        </Stage>
      </div>
      <button
        onClick={download}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Generate &amp; Download PFP
      </button>
    </div>
  );
}
