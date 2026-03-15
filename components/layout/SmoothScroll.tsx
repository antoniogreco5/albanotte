'use client';

import { ReactNode } from 'react';
import { useLenis } from '@/lib/lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
