import { Suspense, lazy, useCallback } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  transparentBackground?: boolean;
}

export function SplineScene({ scene, className, transparentBackground }: SplineSceneProps) {
  const handleLoad = useCallback((app: Application) => {
    if (transparentBackground) {
      app.setBackgroundColor('rgba(0,0,0,0)');
    }
  }, [transparentBackground]);

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={transparentBackground ? handleLoad : undefined}
      />
    </Suspense>
  );
}
