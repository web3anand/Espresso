import { useState } from 'react';
import FlexCard from './components/FlexCard';

const defaultUsers = ['VitalikButerin', 'saylor', 'cz_binance'];

export default function Home() {
  const [users, setUsers] = useState<string[]>(defaultUsers);
  const [input, setInput] = useState('');

  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    const u = input.trim();
    if (u && !users.includes(u)) {
      setUsers([...users, u]);
    }
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-white bg-gradient-to-br from-zinc-900 to-zinc-800">
      <header className="p-6 text-center">
        <h1 className="text-3xl font-bold">Espresso Flex Cards</h1>
        <p className="text-gray-400">Crypto conversations at a glance</p>
      </header>
      <main className="flex-grow px-4 pb-8 container mx-auto">
        <form onSubmit={addUser} className="mb-6 flex justify-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add username"
            className="rounded-l px-3 py-2 text-black focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 px-4 rounded-r">
            Add
          </button>
        </form>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((u) => (
            <FlexCard key={u} username={u} />
          ))}
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Espresso
      </footer>
    </div>
  );
}
