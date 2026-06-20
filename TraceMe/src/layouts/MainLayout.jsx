import React from 'react';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {children}
    </div>
  );
}
