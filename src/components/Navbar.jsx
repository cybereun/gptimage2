import React from 'react';
import { Search, Plus, Database, Unlock, Key, Layers } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  onOpenAddModal, 
  onOpenFirebaseModal,
  isAdminMode,
  onOpenAdminModal,
  onExitAdminMode,
  onShowIntro
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(9, 10, 15, 0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Logo & Title (Click to return to Intro) */}
        <div 
          onClick={onShowIntro}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          title="인트로 화면으로 이동"
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
          }}>
            <Layers size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              GPT-Image2
            </h1>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', fontWeight: '500' }}>
              프롬프트 라이브러리
            </span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div style={{
          flex: 1,
          maxWidth: '480px',
          position: 'relative'
        }}>
          <Search size={17} style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="프롬프트 키워드, 제목, 스타일 검색..."
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.6rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-main)',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Admin Mode Toggle Button */}
          {isAdminMode ? (
            <button
              onClick={onExitAdminMode}
              style={{
                padding: '0.55rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                border: 'none',
                color: '#fff',
                fontWeight: '700',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 0 12px rgba(245, 158, 11, 0.4)'
              }}
              title="관리자 수정 모드 종료"
            >
              <Unlock size={15} />
              <span>🔓 수정모드 종료 (복귀)</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminModal}
              style={{
                padding: '0.55rem 0.7rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem'
              }}
              title="관리자 암호 입력 (수정/삭제 모드)"
            >
              <Key size={16} style={{ color: '#facc15' }} />
              <span>🔑</span>
            </button>
          )}

          {/* Database Icon Only (Firebase text removed) */}
          <button
            onClick={onOpenFirebaseModal}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(236, 72, 153, 0.12)',
              border: '1px solid rgba(236, 72, 153, 0.3)',
              color: '#f472b6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="구글 Firebase 클라우드 DB 연동 설정"
          >
            <Database size={18} />
          </button>

          <button
            onClick={onOpenAddModal}
            className="btn-primary"
            style={{
              padding: '0.55rem 1rem',
              fontSize: '0.85rem'
            }}
          >
            <Plus size={16} />
            <span>새 프롬프트</span>
          </button>
        </div>
      </div>
    </header>
  );
}
