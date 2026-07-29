import React from 'react';
import { Layers } from 'lucide-react';

export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  return (
    <div style={{
      maxWidth: '1300px',
      margin: '1.25rem auto 0.5rem',
      padding: '0 1.5rem',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      paddingBottom: '0.5rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        marginRight: '0.4rem',
        flexShrink: 0
      }}>
        <Layers size={16} />
        <span>카테고리:</span>
      </div>

      {categories.map((cat) => {
        const isActive = activeCategory === cat.name;
        return (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: isActive 
                ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))' 
                : 'rgba(255, 255, 255, 0.05)',
              border: isActive 
                ? '1px solid transparent' 
                : '1px solid var(--glass-border)',
              color: isActive ? 'white' : 'var(--text-muted)',
              fontWeight: isActive ? '600' : '400',
              fontSize: '0.85rem',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none'
            }}
          >
            {cat.label} ({cat.count})
          </button>
        );
      })}
    </div>
  );
}
