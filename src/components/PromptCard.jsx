import React, { useState } from 'react';
import { Copy, Check, Star, Sparkles, Trash2, Image as ImageIcon, MessageSquareText } from 'lucide-react';

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

  // Dynamic aesthetic fallback background for text-only prompts
  const categoryGradients = [
    'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 100%)',
    'linear-gradient(135deg, rgba(6,182,212,0.3) 0%, rgba(139,92,246,0.2) 100%)',
    'linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(139,92,246,0.2) 100%)',
    'linear-gradient(135deg, rgba(34,197,94,0.3) 0%, rgba(59,130,246,0.2) 100%)'
  ];

  // Hash title to pick consistent gradient index
  const hash = promptItem.title ? promptItem.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const gradientBg = categoryGradients[hash % categoryGradients.length];

  const hasValidImage = promptItem.imageUrl && promptItem.imageUrl.trim().length > 0 && !imgError;

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
        position: 'relative',
        minHeight: '340px'
      }}
    >
      {/* Image / Header Artwork Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: hasValidImage ? '65%' : '45%',
        background: gradientBg,
        overflow: 'hidden',
        transition: 'padding-top 0.3s ease'
      }}>
        {hasValidImage ? (
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
            color: '#f3f4f6',
            padding: '1.25rem',
            textAlign: 'center',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)'
          }}>
            <MessageSquareText size={32} style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', opacity: 0.85 }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>
              GPT-Image2 Text Prompt
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          background: 'rgba(9, 10, 15, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: '500',
          color: '#e2e8f0',
          maxWidth: '180px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {promptItem.category}
        </div>

        {/* Top Right Action Buttons */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          gap: '0.4rem',
          zIndex: 5
        }}>
          <button
            onClick={handleBookmark}
            style={{
              background: isBookmarked ? 'rgba(234, 179, 8, 0.3)' : 'rgba(9, 10, 15, 0.65)',
              border: isBookmarked ? '1px solid rgba(234, 179, 8, 0.6)' : '1px solid rgba(255, 255, 255, 0.12)',
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

          <button
            onClick={handleDelete}
            style={{
              background: 'rgba(239, 68, 68, 0.25)',
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
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '0.6rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          fontFamily: 'JetBrains Mono, monospace'
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
