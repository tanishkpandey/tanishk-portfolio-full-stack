'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function FooterWrapper() {
  const pathname = usePathname();
  
  // Only show footer on specific routes
  const showFooter = pathname && (
    pathname === '/' || 
    pathname === '/blogs' || 
    pathname === '/snippets' || 
    pathname === '/resources'
  );

  if (!showFooter) return null;
  
  return <Footer />;
}
