import { SilkPreloader } from '../ui/silk-background-animation';

interface PreloaderProps {
  onComplete: () => void;
  duration?: number;
}

export default function Preloader({ onComplete, duration = 3200 }: PreloaderProps) {
  return (
    <SilkPreloader
      title="Teczz"
      subtitle="IA  +  Processo  =  Resultado Real"
      onComplete={onComplete}
      duration={duration}
    />
  );
}
