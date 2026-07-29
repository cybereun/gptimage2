import React from 'react';
import { Search, Plus, Database, Sparkles, Home, X } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  onOpenAddModal, 
  onOpenFirebaseModal, 
  onGoHome,
  totalCount,
  filteredCount
}) {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0.9rem 1.5rem',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Left: Brand Logo & Home */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={onGoHome}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--text-main)'
            }}
            title="인트로 페이지로 이동"
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-hero)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Sparkles size={22} color="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="brand-title" style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                GPT-Image2
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Prompt Skill Hub
              </div>
            </div>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div style={{
          flex: '1 1 340px',
          maxWidth: '520px',
          position: 'relative'
        }}>
          <Search 
            size={18} 
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="프롬프트, 스타일, 카테고리 검색... (예: anime, cyberpunk, portrait)"
            style={{
              width: '100%',
              padding: '0.65rem 2.5rem 0.65rem 2.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent-purple)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.2rem'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Add Prompt Button */}
          <button 
            onClick={onOpenAddModal}
            className="btn-primary"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
          >
            <Plus size={18} />
            <span>프롬프트 추가</span>
          </button>

          {/* Firebase DB Config Button */}
          <button 
            onClick={onOpenFirebaseModal}
            className="btn-secondary"
            style={{ padding: '0.55rem 0.9rem', fontSize: '0.88rem' }}
            title="Firebase DB 설정"
          >
            <Database size={18} style={{ color: '#f472b6' }} />
            <span style={{ display: 'none', md: 'inline' }}>Firebase DB</span>
          </button>
        </div>
      </div>
    </header>
  );
}
