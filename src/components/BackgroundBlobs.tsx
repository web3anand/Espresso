export default function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-indigo-700 opacity-30 blur-3xl animate-pulse" />
      <div className="absolute right-1/3 bottom-0 h-[40vh] w-[40vh] rounded-full bg-pink-500 opacity-20 blur-3xl animate-pulse" />
    </div>
  );
}
