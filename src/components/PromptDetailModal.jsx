import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Star, Save, Trash2, Key, Unlock, Link, Upload } from 'lucide-react';

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
  const [editedImageUrl, setEditedImageUrl] = useState(promptItem ? promptItem.imageUrl : '');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    if (promptItem) {
      setEditedTitle(promptItem.title || '');
      setEditedCategory(promptItem.category || '');
      setEditedPrompt(promptItem.prompt || '');
      setEditedImageUrl(promptItem.imageUrl || '');
    }
  }, [promptItem]);

  if (!promptItem) return null;

  const categories = [
    "⚠️ 이미지 없음 (작업용)",
    "👩‍🦰 인물 사진 & 포트레이트",
    "🎨 애니메이션 & 만화 일러스트",
    "📋 브랜딩 & 디자인 가이드보드",
    "🐱 동물 & 캐릭터 생명체",
    "🛍️ 제품 & 음식 & 상업 화보",
    "📐 3D 아트 & UI/UX & 디자인",
    "🏎️ 차량 & 수송기기",
    "🏞️ 자연 & 풍경 & 스트리트",
    "🎬 시네마틱 & 영화 비주얼",
    "🏛️ 건축 & 인테리어 공간",
    "✨ 아트 & 스페셜 갤러리"
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
      prompt: editedPrompt.trim(),
      imageUrl: editedImageUrl.trim()
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('이미지 파일 크기는 8MB 이하이어야 합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const hasValidImage = editedImageUrl && editedImageUrl.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          background: '#0d111a',
          border: isAdminMode ? '2px solid #f59e0b' : '1px solid var(--glass-border)',
          boxShadow: isAdminMode ? '0 0 25px rgba(245, 158, 11, 0.3)' : 'none'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isAdminMode ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(239, 68, 68, 0.2))' : 'rgba(9, 10, 15, 0.6)'
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
              {editedCategory}
            </span>

            {isAdminMode && (
              <span style={{
                fontSize: '0.8rem',
                background: '#f59e0b',
                color: '#000',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: '900',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.5)'
              }}>
                ✏️ 관리자 수정 모드 활성화 중
              </span>
            )}
          </div>

          {/* Top Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {!isAdminMode ? (
              <button
                onClick={onOpenAdminModal}
                style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid #f59e0b',
                  color: '#facc15',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
                title="수정/삭제 비밀번호 1234 입력"
              >
                <Key size={15} />
                <span>🔑 비밀번호 입력 (수정 모드)</span>
              </button>
            ) : (
              <button
                onClick={onExitAdminMode}
                style={{
                  background: '#f59e0b',
                  border: 'none',
                  color: '#000',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
                title="수정모드 종료 (일반 읽기 모드 복귀)"
              >
                <Unlock size={15} />
                <span>[복귀] 완료</span>
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
          
          {/* Image Display & Admin Image Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {hasValidImage && (
              <div style={{
                width: '100%',
                maxHeight: '340px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: isAdminMode ? '2px dashed #f59e0b' : '1px solid var(--glass-border)'
              }}>
                <img
                  src={editedImageUrl}
                  alt={editedTitle}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '340px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}

            {/* Admin Image URL / File Change Section */}
            {isAdminMode && (
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Link size={16} /> 🖼️ 이미지 변경 (URL 경로 입력 또는 컴퓨터 파일 업로드)
                </label>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={editedImageUrl}
                    onChange={(e) => setEditedImageUrl(e.target.value)}
                    placeholder="이미지 URL 주소 입력 (예: /img/img_no_image_1.png 또는 외부 링크)"
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid #f59e0b',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />

                  <label style={{
                    padding: '0.6rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(139, 92, 246, 0.3)',
                    border: '1px solid var(--accent-purple)',
                    color: '#c084fc',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap'
                  }}>
                    <Upload size={15} />
                    <span>파일 선택</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Title Area */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
              프롬프트 제목 {isAdminMode && <span style={{ color: '#f59e0b', fontWeight: '700' }}>(수정 가능)</span>}
            </label>
            {isAdminMode ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="제목을 입력하세요..."
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
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#f59e0b', fontWeight: '700', marginBottom: '0.3rem' }}>
                카테고리 변경 (선택)
              </label>
              <select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
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
                GPT-Image2 프롬프트 문구 {isAdminMode && <span style={{ color: '#f59e0b', fontWeight: '700' }}>(수정 가능)</span>}
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
                placeholder="프롬프트 문구를 입력하세요..."
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
                <span style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: '800' }}>
                  ✓ 성공적으로 저장되었습니다!
                </span>
              )}
              <button
                onClick={handleDelete}
                style={{
                  padding: '0.55rem 0.95rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  color: '#ef4444',
                  fontWeight: '700',
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
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
                }}
              >
                <Save size={16} />
                <span>수정 저장하기</span>
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
