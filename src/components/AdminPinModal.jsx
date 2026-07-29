import React, { useState } from 'react';
import { X, Lock, KeyRound, Check } from 'lucide-react';

export default function AdminPinModal({ onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      onSuccess();
      onClose();
    } else {
      setError('비밀번호가 일치하지 않습니다. (기본: 1234)');
      setPin('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '380px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.2rem',
          background: '#0d111a',
          border: '1px solid rgba(139, 92, 246, 0.4)'
        }}
      >
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(139, 92, 246, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-purple)'
        }}>
          <KeyRound size={28} />
        </div>

        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.3rem' }}>
            관리자 수정 모드 인증
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            프롬프트 제목/내용을 수정하려면 4자리 비밀번호를 입력하세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <input
              type="password"
              maxLength={4}
              autoFocus
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(''); }}
              placeholder="숫자 4자리 (기본: 1234)"
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '1.4rem',
                letterSpacing: '0.4rem',
                textAlign: 'center',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: error ? '1px solid #ef4444' : '1px solid var(--glass-border)',
                color: 'var(--text-main)',
                outline: 'none'
              }}
            />
            {error && (
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#ef4444', marginTop: '0.4rem' }}>
                {error}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
              취소
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>
              <Check size={16} />
              <span>확인</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
