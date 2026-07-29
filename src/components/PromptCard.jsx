import React, { useState } from 'react';
import { Copy, Check, Star, AlertTriangle } from 'lucide-react';

export default function PromptCard({ 
  promptItem, 
  onSelectPrompt, 
  onCopyPrompt,
  isBookmarked,
  onToggleBookmark
}) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(promptItem.prompt);
    setCopied(true);
    if (onCopyPrompt) onCopyPrompt(promptItem.prompt);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(promptItem.id);
  };

  const isNoImageCategory = promptItem.category === '⚠️ 이미지 없음 (작업용)';
  const hasValidImage = !imageError && promptItem.imageUrl && promptItem.imageUrl.trim().length > 0;

  return (
    <div 
      className="glass-panel card-hover"
      onClick={() => onSelectPrompt(promptItem)}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        height: '100%',
        position: 'relative',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        border: isNoImageCategory ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid var(--glass-border)'
      }}
    >
      {/* Work Number Badge if '⚠️ 이미지 없음 (작업용)' */}
      {isNoImageCategory && promptItem.workNumber && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 5,
          background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
          color: '#ffffff',
          fontWeight: '900',
          fontSize: '0.85rem',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <AlertTriangle size={14} />
          <span>NO. #{promptItem.workNumber}</span>
        </div>
      )}

      {/* Card Image Header */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '190px',
        backgroundColor: '#0a0d14',
        overflow: 'hidden'
      }}>
        {hasValidImage ? (
          <img
            src={promptItem.imageUrl}
            alt={promptItem.title}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1e1b4b, #311042)',
            color: '#fbbf24',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>
              #{promptItem.workNumber || '1'}
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', opacity: 0.9 }}>
              ⚠️ 이미지 없음 (작업용)
            </div>
          </div>
        )}

        {/* Category Tag Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(9, 10, 15, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-full)',
          padding: '0.2rem 0.65rem',
          fontSize: '0.72rem',
          fontWeight: '600',
          color: '#e2e8f0',
          zIndex: 2
        }}>
          {promptItem.category}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(9, 10, 15, 0.65)',
            backdropFilter: 'blur(6px)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isBookmarked ? '#facc15' : '#94a3b8',
            cursor: 'pointer',
            zIndex: 3,
            transition: 'transform 0.2s ease'
          }}
          title={isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        >
          <Star size={16} fill={isBookmarked ? '#facc15' : 'none'} />
        </button>
      </div>

      {/* Card Content Body */}
      <div style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        <div>
          <h3 style={{
            fontSize: '0.98rem',
            fontWeight: '700',
            color: 'var(--text-main)',
            marginBottom: '0.4rem',
            lineHeight: '1.35',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {promptItem.title}
          </h3>

          <p style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            {promptItem.prompt}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.65rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            {isNoImageCategory ? `작업 번호 #${promptItem.workNumber}` : (promptItem.tags ? promptItem.tags[0] : 'GPT-Image2')}
          </span>

          <button
            onClick={handleCopy}
            className={copied ? "btn-primary" : "btn-secondary"}
            style={{
              padding: '0.3rem 0.65rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-md)'
            }}
          >
            {copied ? (
              <><Check size={13} /><span>복사됨</span></>
            ) : (
              <><Copy size={13} /><span>복사</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
