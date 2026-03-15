import Link from 'next/link';
import { SITE } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-alb-black flex flex-col items-center justify-center text-center px-6">
      {/* Lost in the notte sticker */}
      <div className="alb-sticker mb-8 rotate-[-3deg]">
        <span className="alb-dot mr-2.5" />
        Lost in the Notte
      </div>

      <h1 className="font-heading text-hero-xl font-bold text-alb-off-white mb-4">
        404
      </h1>
      <p className="text-body-lg text-alb-muted mb-8 max-w-md">
        This page doesn&apos;t exist — but our coffee does. Let&apos;s get you
        back on track.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="alb-btn-primary">
          Back Home
        </Link>
        <Link href="/collections/drop001" className="alb-btn-secondary">
          Shop Coffee
        </Link>
      </div>

      {/* Coordinates */}
      <p className="mt-16 text-body-xs text-alb-muted/30 tracking-wide">
        {SITE.coordinates.lat.toFixed(4)}°N,{' '}
        {Math.abs(SITE.coordinates.lng).toFixed(4)}°W
      </p>
    </div>
  );
}
