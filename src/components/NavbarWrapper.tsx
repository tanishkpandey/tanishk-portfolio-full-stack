'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function NavbarWrapper() {
  const pathname = usePathname();
  const showNavbar = pathname === '/' || pathname === '/blogs' || pathname === '/snippets' || pathname === '/resources';

  return showNavbar ? <Navbar /> : null;
}
