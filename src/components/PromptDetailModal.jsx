import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Star, Save, Trash2, Key, Unlock } from 'lucide-react';

export default function PromptDetailModal({ 
  promptItem, 
  onClose, 
  onCopy, 
  isBookmarked, 
  onToggleBookmark,
  isAdminMode,
  onOpenAdminModal,
  onExitAdminMode,
  onUpdatePrompt,
  onDeletePrompt
}) {
  const [copied, setCopied] = useState(false);
  const [editedTitle, setEditedTitle] = useState(promptItem ? promptItem.title : '');
  const [editedCategory, setEditedCategory] = useState(promptItem ? promptItem.category : '');
  const [editedPrompt, setEditedPrompt] = useState(promptItem ? promptItem.prompt : '');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    if (promptItem) {
      setEditedTitle(promptItem.title || '');
      setEditedCategory(promptItem.category || '');
      setEditedPrompt(promptItem.prompt || '');
    }
  }, [promptItem]);

  if (!promptItem) return null;

  const categories = [
    "인물 사진 / 셀카",
    "인플루언서 / 모델",
    "캐릭터 / 커플 / 그룹",
    "애니메이션 & 만화",
    "영화 & 시네마틱",
    "게이밍 & 판타지",
    "패션 & 라이프스타일",
    "제품 / 음식 / 아이템",
    "동물 / 생명체",
    "차량 / 수송기기",
    "건축 / 인테리어",
    "풍경 / 자연",
    "도시 풍경 / 스트리트",
    "📋 브랜드 & 제품 디자인 가이드",
    "3D & UI / UX",
    "텍스트 / 포스터",
    "유화 / 수채화 / 미술",
    "다이어그램 / 차트",
    "⚠️ 이미지 없음 (작업용)",
    "기타 갤러리"
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(editedPrompt);
    setCopied(true);
    if (onCopy) onCopy(editedPrompt);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!editedTitle.trim() || !editedPrompt.trim()) {
      alert('제목과 프롬프트 내용은 필수 항목입니다.');
      return;
    }

    onUpdatePrompt(promptItem.id, {
      title: editedTitle.trim(),
      category: editedCategory,
      prompt: editedPrompt.trim()
    });

    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleDelete = () => {
    if (window.confirm(`'${promptItem.title}' 프롬프트를 정말로 삭제하시겠습니까?`)) {
      onDeletePrompt(promptItem.id);
      onClose();
    }
  };

  const hasValidImage = promptItem.imageUrl && promptItem.imageUrl.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '750px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          background: '#0d111a',
          border: isAdminMode ? '2px solid #f59e0b' : '1px solid var(--glass-border)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isAdminMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(9, 10, 15, 0.6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              fontSize: '0.75rem',
              background: 'rgba(139, 92, 246, 0.25)',
              color: '#c084fc',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: '600'
            }}>
              {promptItem.category}
            </span>

            {isAdminMode && (
              <span style={{
                fontSize: '0.75rem',
                background: '#f59e0b',
                color: '#000',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '800'
              }}>
                ✏️ 수정 가능 (관리자 모드)
              </span>
            )}
          </div>

          {/* Top Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {!isAdminMode ? (
              <button
                onClick={onOpenAdminModal}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--glass-border)',
                  color: '#facc15',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
                title="수정/삭제 비밀번호 입력"
              >
                <Key size={15} />
                <span>🔑</span>
              </button>
            ) : (
              <button
                onClick={onExitAdminMode}
                style={{
                  background: '#f59e0b',
                  border: 'none',
                  color: '#000',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
                title="수정모드 종료 (일반 복귀)"
              >
                <Unlock size={14} />
                <span>복귀</span>
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.2rem'
              }}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Image Display */}
          {hasValidImage && (
            <div style={{
              width: '100%',
              maxHeight: '380px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={promptItem.imageUrl}
                alt={promptItem.title}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '380px',
                  objectFit: 'contain'
                }}
              />
            </div>
          )}

          {/* Title Area */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              프롬프트 제목 {isAdminMode && <span style={{ color: '#f59e0b' }}>(수정 가능)</span>}
            </label>
            {isAdminMode ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid #f59e0b',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  outline: 'none'
                }}
              />
            ) : (
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.35 }}>
                {promptItem.title}
              </h2>
            )}
          </div>

          {/* Category Selector */}
          {isAdminMode && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                카테고리 변경
              </label>
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#121621',
                  border: '1px solid #f59e0b',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Prompt Content Area */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                GPT-Image2 프롬프트 문구 {isAdminMode && <span style={{ color: '#f59e0b' }}>(수정 가능)</span>}
              </label>
              <button
                onClick={handleCopy}
                className={copied ? "btn-primary" : "btn-secondary"}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              >
                {copied ? <><Check size={14} /><span>복사됨!</span></> : <><Copy size={14} /><span>복사</span></>}
              </button>
            </div>

            {isAdminMode ? (
              <textarea
                rows={6}
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid #f59e0b',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  fontFamily: 'JetBrains Mono, monospace',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            ) : (
              <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                fontSize: '0.9rem',
                lineHeight: 1.65,
                color: 'var(--text-main)',
                fontFamily: 'JetBrains Mono, monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                maxHeight: '260px',
                overflowY: 'auto'
              }}>
                {promptItem.prompt}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(9, 10, 15, 0.4)'
        }}>
          <button
            onClick={() => onToggleBookmark(promptItem.id)}
            className="btn-secondary"
            style={{
              color: isBookmarked ? '#facc15' : 'var(--text-muted)',
              borderColor: isBookmarked ? 'rgba(234, 179, 8, 0.4)' : 'var(--glass-border)'
            }}
          >
            <Star size={16} fill={isBookmarked ? '#facc15' : 'none'} />
            <span>{isBookmarked ? '즐겨찾기 됨' : '즐겨찾기'}</span>
          </button>

          {isAdminMode ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {isSavedNotice && (
                <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: '600' }}>
                  ✓ 저장 완료!
                </span>
              )}
              <button
                onClick={handleDelete}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ef4444',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Trash2 size={16} />
                <span>삭제</span>
              </button>

              <button
                onClick={handleSave}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)'
                }}
              >
                <Save size={16} />
                <span>수정 저장</span>
              </button>
            </div>
          ) : (
            <button onClick={handleCopy} className="btn-primary">
              <Copy size={16} />
              <span>프롬프트 복사하기</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
