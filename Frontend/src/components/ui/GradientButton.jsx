import React from 'react';

export default function GradientButton({ children, onClick, className = '', style = {}, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-2xl font-semibold text-white transition-transform transform hover:scale-105 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #6BBFF1, #2C74B3)',
        boxShadow: '0 8px 20px rgba(44,116,179,0.3)',
        padding: '0.75rem 1.25rem',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
