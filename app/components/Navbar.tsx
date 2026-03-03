'use client';

import Link from 'next/link';
import Image from 'next/image';
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
          ? 'bg-[#020c1b]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-red-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between py-4" style={{ minHeight: '380px' }}>
          {/* Desktop Nav — left side */}
          <div className="hidden md:flex items-center gap-8 z-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  pathname === link.href
                    ? 'text-red-500'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-red-500 transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Logo — absolutely centered */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 group"
          >
            <Image
              src="/brand/logo.png"
              alt="Beast and Body Logo"
              width={360}
              height={360}
              className="rounded-xl group-hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          {/* Right side — Book Now + mobile menu button */}
          <div className="flex items-center gap-4 z-10">
            <Link
              href="/schedule"
              className="hidden md:block bg-red-600 hover:bg-red-500 text-[#020c1b] font-bold px-5 py-2 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 tracking-wide"
            >
              Book Now
            </Link>
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
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#071428]/98 backdrop-blur-md border-t border-red-500/10 px-4 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 text-base font-medium border-b border-slate-800 transition-colors ${
                pathname === link.href
                  ? 'text-red-500'
                  : 'text-slate-300 hover:text-white'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/schedule"
            className="mt-4 block text-center bg-red-600 hover:bg-red-500 text-[#020c1b] font-bold px-5 py-3 rounded-full text-sm transition-colors tracking-wide"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
