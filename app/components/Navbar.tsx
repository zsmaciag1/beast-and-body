'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/waiver', label: 'Waiver' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020c1b]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-sky-400/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="text-sky-400 group-hover:text-sky-300 transition-colors"
              >
                <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M18 4 L18 32 M4 18 L32 18 M8.5 8.5 L27.5 27.5 M27.5 8.5 L8.5 27.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="18" cy="18" r="3" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none tracking-wider">
                BEAST & BODY
              </div>
              <div className="text-sky-400 text-[10px] tracking-[0.2em] font-medium">
                MOBILE RECOVERY
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  pathname === link.href
                    ? 'text-sky-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-sky-400 transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/schedule"
              className="bg-sky-500 hover:bg-sky-400 text-[#020c1b] font-bold px-5 py-2 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-sky-400/25 tracking-wide"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-300 hover:text-white p-2 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#071428]/98 backdrop-blur-md border-t border-sky-400/10 px-4 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 text-base font-medium border-b border-slate-800 transition-colors ${
                pathname === link.href
                  ? 'text-sky-400'
                  : 'text-slate-300 hover:text-white'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/schedule"
            className="mt-4 block text-center bg-sky-500 hover:bg-sky-400 text-[#020c1b] font-bold px-5 py-3 rounded-full text-sm transition-colors tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
