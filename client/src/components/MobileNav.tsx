import { useState } from 'react';
import { Link } from 'wouter';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-black/90 p-6 rounded-lg border border-white/10">
          <nav className="flex flex-col gap-4">
            <Link href="/episodes" className="text-white/80 hover:text-white transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Episodes
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white transition-colors font-medium" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
