import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Tag, ExternalLink } from 'lucide-react';

export default function PromptDetailModal({ promptItem, onClose, onCopy }) {
  const [copied, setCopied] = useState(false);

  if (!promptItem) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptItem.prompt);
    setCopied(true);
    if (onCopy) onCopy(promptItem.prompt);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(9, 10, 15, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}>
              {promptItem.category}
            </span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{promptItem.title}</h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: 'var(--text-muted)',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div style={{
          padding: '1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {/* Image Showcase */}
          {promptItem.imageUrl && (
            <div style={{
              width: '100%',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: '#000',
              maxHeight: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={promptItem.imageUrl}
                alt={promptItem.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '420px',
                  objectFit: 'contain'
                }}
              />
            </div>
          )}

          {/* Full Prompt Text Block */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.65rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>프롬프트 전문 (Prompt Text)</span>
              </div>

              <button
                onClick={handleCopy}
                className={copied ? "btn-primary" : "btn-secondary"}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "클립보드 복사 완료!" : "프롬프트 복사"}</span>
              </button>
            </div>

            <pre style={{
              padding: '1.15rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#e2e8f0',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              userSelect: 'all'
            }}>
              {promptItem.prompt}
            </pre>
          </div>

          {/* Metadata & Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--glass-border)'
          }}>
            {promptItem.metadata && (
              <div style={{ flex: '1 1 200px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.25rem' }}>메타데이터:</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{promptItem.metadata}</span>
              </div>
            )}

            {promptItem.tags && promptItem.tags.length > 0 && (
              <div style={{ flex: '1 1 200px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.25rem' }}>태그:</span>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {promptItem.tags.map(t => (
                    <span key={t} style={{
                      fontSize: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Tag size={12} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
