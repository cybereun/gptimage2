import React, { useState } from 'react';
import { Copy, Check, Star, Sparkles, Trash2 } from 'lucide-react';

export default function PromptCard({ promptItem, onSelect, onCopy, isBookmarked, onToggleBookmark, onDeletePrompt }) {
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(promptItem.prompt);
    setCopied(true);
    if (onCopy) onCopy(promptItem.prompt);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(promptItem.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`'${promptItem.title}' 프롬프트를 갤러리에서 삭제하시겠습니까?`)) {
      if (onDeletePrompt) onDeletePrompt(promptItem.id);
    }
  };

  const fallbackBg = 'linear-gradient(135deg, rgba(30,35,50,1) 0%, rgba(15,18,28,1) 100%)';

  return (
    <div 
      onClick={() => onSelect(promptItem)}
      className="glass-panel glass-panel-hover" 
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '65%',
        background: fallbackBg,
        overflow: 'hidden'
      }}>
        {!imgError && promptItem.imageUrl ? (
          <img
            src={promptItem.imageUrl}
            alt={promptItem.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.4s ease, transform 0.4s ease'
            }}
            className="card-image"
          />
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-subtle)',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <Sparkles size={28} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
            <span style={{ fontSize: '0.8rem' }}>{promptItem.category}</span>
          </div>
        )}

        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          background: 'rgba(9, 10, 15, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: '500',
          color: '#e2e8f0'
        }}>
          {promptItem.category}
        </div>

        {/* Top Right Action Buttons */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          gap: '0.4rem'
        }}>
          {/* Bookmark Toggle */}
          <button
            onClick={handleBookmark}
            style={{
              background: isBookmarked ? 'rgba(234, 179, 8, 0.25)' : 'rgba(9, 10, 15, 0.65)',
              border: isBookmarked ? '1px solid rgba(234, 179, 8, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isBookmarked ? '#facc15' : 'var(--text-muted)'
            }}
            title="즐겨찾기"
          >
            <Star size={16} fill={isBookmarked ? '#facc15' : 'none'} />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#f87171'
            }}
            title="프롬프트 삭제"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        padding: '1.15rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        flex: 1
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          lineHeight: 1.35,
          color: 'var(--text-main)',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {promptItem.title}
        </h3>

        <p style={{
          fontSize: '0.84rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '0.5rem 0.65rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(255, 255, 255, 0.04)'
        }}>
          {promptItem.prompt || '(미리보기 프롬프트 없음)'}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '0.5rem'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
            1-Click Copy
          </span>

          <button
            onClick={handleCopy}
            className={copied ? "btn-primary" : "btn-secondary"}
            style={{
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-md)'
            }}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>복사됨!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>프롬프트 복사</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
