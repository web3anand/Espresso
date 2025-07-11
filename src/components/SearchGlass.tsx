import type { FormEvent } from 'react';

interface SearchGlassProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export default function SearchGlass({ value, onChange, onSubmit, loading }: SearchGlassProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="glass max-w-lg w-full p-1 rounded-full flex items-center overflow-hidden"
    >
      <input
        type="text"
        placeholder="Enter X username…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent px-6 py-3 placeholder-gray-200 focus:outline-none"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold"
      >
        {loading ? '...' : 'Search'}
      </button>
    </form>
  );
}
