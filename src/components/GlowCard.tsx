import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const CardCanvas = ({ children, className = '' }: CardProps) => (
  <div className={`card-canvas ${className}`}>
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
        </filter>
      </defs>
    </svg>
    <div className="card-backdrop" />
    {children}
  </div>
);

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`glow-card ${className}`}>
    <div className="border-element border-left" />
    <div className="border-element border-right" />
    <div className="border-element border-top" />
    <div className="border-element border-bottom" />
    <div className="card-content">
      {children}
    </div>
  </div>
);

export { CardCanvas, Card };
