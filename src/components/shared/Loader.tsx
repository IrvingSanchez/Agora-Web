/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@iconify/react';
import '@/assets/scss/custom/loader.scss'; // Si prefieres CSS-in-JS puedes usar styled-components

type LoaderSize = 'small' | 'medium' | 'large';

interface LoaderProps {
  size?: LoaderSize;
  background?: boolean;
}

export const Loader = ({ size = 'medium', background = false }: LoaderProps) => {
  const sizes: Record<LoaderSize, string> = {
    small: '40px',
    medium: '60px',
    large: '80px'
  };

  return (
    <div 
      className={`loader-container ${background ? 'with-background' : ''}`}
      style={{ '--loader-size': sizes[size] } as React.CSSProperties}
    >
      <div className="loader-spinner">
        <Icon 
          icon="svg-spinners:270-ring-with-bg" 
          className="loader-icon" 
        />
      </div>
    </div>
  );
};