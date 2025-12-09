import React from 'react';

// Small fallback animated text component to avoid missing-import errors
export default function AnimatedText({ children, className = '' }) {
  return (
    <span className={`inline-block ${className}`} style={{ display: 'inline-block', transition: 'transform 0.6s ease' }}>
      {children}
    </span>
  );
}
