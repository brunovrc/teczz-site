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
      app.setBackgroundColor('transparent');
    }
  }, [transparentBackground]);

  return (
    <Suspense fallback={null}>
      <Spline
        scene={scene}
        className={className}
        onLoad={transparentBackground ? handleLoad : undefined}
      />
    </Suspense>
  );
}
