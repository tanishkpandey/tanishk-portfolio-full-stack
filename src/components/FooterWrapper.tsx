'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function FooterWrapper() {
  const pathname = usePathname();
  const showFooter = pathname === '/' || pathname === '/blogs' || pathname === '/snippets' || pathname === '/resources';

  return showFooter ? <Footer /> : null;
}
