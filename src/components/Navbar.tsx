import { useEffect, useState } from 'react';

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-10 w-full p-4 flex justify-between items-center text-gray-200 text-xs uppercase transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <span>EspressoYaps</span>
      <span>Built by John Doe</span>
    </nav>
  );
}
