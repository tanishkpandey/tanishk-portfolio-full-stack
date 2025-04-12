'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function NavbarWrapper() {
  const pathname = usePathname();
  
  // Only show navbar on specific routes
  const showNavbar = pathname && (
    pathname === '/' || 
    pathname === '/blogs' || 
    pathname === '/snippets' || 
    pathname === '/resources'
  );

  if (!showNavbar) return null;
  
  return <Navbar />;
}
