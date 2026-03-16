'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,      // makin tinggi → scroll terasa berat
      lerp: 0.07,         // 0–1 (semakin kecil → makin halus)
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,    
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}