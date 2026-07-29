import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div style={{
        background: 'rgba(18, 22, 33, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        padding: '0.85rem 1.35rem',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-glow), 0 10px 25px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        color: '#f3f4f6',
        fontSize: '0.9rem',
        fontWeight: '500'
      }}>
        <CheckCircle2 size={18} style={{ color: 'var(--accent-cyan)' }} />
        <span>{message}</span>
      </div>
    </div>
  );
}
